import express from "express";
import multer from "multer";
import cors from "cors";
import fs from "fs";
import mime from "mime";
import { GoogleGenAI } from "@google/genai";

const app = express();
const upload = multer({ dest: "uploads/" });
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY, // 👉 환경변수에 키 저장
});

// 유저가 이미지를 업로드하고, 블라인드 합성 요청
app.post("/generate", upload.single("image"), async (req, res) => {
  try {
    const userPrompt = req.body.prompt || "Create blinds variations with 5 colors and styles";
    const imagePath = req.file?.path;

    const model = "gemini-2.5-flash-image-preview";
    const config = {
      responseModalities: ["IMAGE", "TEXT"],
    };

    const contents = [
      {
        role: "user",
        parts: [
          { text: userPrompt },
          ...(imagePath
            ? [
                {
                  inlineData: {
                    mimeType: mime.getType(imagePath),
                    data: fs.readFileSync(imagePath).toString("base64"),
                  },
                },
              ]
            : []),
        ],
      },
    ];

    // 스트리밍 응답
    const response = await ai.models.generateContentStream({
      model,
      config,
      contents,
    });

    let images = [];
    let fileIndex = 0;

    for await (const chunk of response) {
      if (!chunk.candidates?.[0]?.content?.parts) continue;

      const part = chunk.candidates[0].content.parts[0];

      if (part.inlineData) {
        const fileName = `output_${Date.now()}_${fileIndex++}.${mime.getExtension(
          part.inlineData.mimeType || "png"
        )}`;
        const buffer = Buffer.from(part.inlineData.data || "", "base64");
        fs.writeFileSync(`outputs/${fileName}`, buffer);
        images.push(`/outputs/${fileName}`);
      } else if (part.text) {
        console.log("AI TEXT:", part.text);
      }
    }

    res.json({ success: true, images });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// 정적 파일 서빙
app.use("/outputs", express.static("outputs"));

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
