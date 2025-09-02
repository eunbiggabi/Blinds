import React, { useState } from "react";

const BlindsSimulator = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [blindType, setBlindType] = useState("roller");
  const [color, setColor] = useState("#000000");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!image) return alert("사진을 업로드해주세요.");

    setLoading(true);

    const formData = new FormData();
    formData.append("image", image);
    formData.append("blindType", blindType);
    formData.append("color", color);

    const res = await fetch("http://localhost:5000/generate", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResult(data.imageUrl);
    setLoading(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Blinds Simulator</h2>

      <input type="file" accept="image/*" onChange={handleImageChange} />
      {preview && <img src={preview} alt="preview" width="300" style={{ marginTop: "10px" }} />}

      <div style={{ marginTop: "10px" }}>
        <label>블라인드 종류: </label>
        <select value={blindType} onChange={(e) => setBlindType(e.target.value)}>
          <option value="roller">Roller</option>
          <option value="venetian">Venetian</option>
          <option value="vertical">Vertical</option>
          <option value="roman">Roman</option>
          <option value="panel">Panel</option>
        </select>
      </div>

      <div style={{ marginTop: "10px" }}>
        <label>색상 선택: </label>
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
      </div>

      <button onClick={handleSubmit} disabled={loading} style={{ marginTop: "20px" }}>
        {loading ? "생성 중..." : "합성하기"}
      </button>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>결과 이미지</h3>
          <img src={result} alt="result" width="400" />
        </div>
      )}
    </div>
  );
};

export default BlindsSimulator;
