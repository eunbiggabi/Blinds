// // BlindSimulatorWithImage.jsx
// import React, { useState, useRef } from "react";
// import { Stage, Layer, Rect, Line, Image as KonvaImage } from "react-konva";

// const blindTypes = [
//   "roller",
//   "vertical",
//   "venetian",
//   "panel",
//   "awning",
//   "curtain",
//   "shutter",
// ];

// const colors = ["#ffffff", "#f4a261", "#2a9d8f", "#e76f51", "#264653", "#e9c46a"];

// const BlindSimulatorWithImage = () => {
//   const [selectedType, setSelectedType] = useState("roller");
//   const [selectedColor, setSelectedColor] = useState("#ffffff");
//   const [width, setWidth] = useState(200); // 실제 설치 폭
//   const [height, setHeight] = useState(300); // 실제 설치 높이
//   const [image, setImage] = useState(null);

//   const uploadedImage = useRef(null);

//   // 이미지 업로드 처리
//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const img = new window.Image();
//     img.src = URL.createObjectURL(file);
//     img.onload = () => setImage(img);
//   };

//   // 블라인드 그리기
//   const renderBlind = () => {
//     const scale = 1; // 나중에 화면 비율에 따라 조정 가능

//     switch (selectedType) {
//       case "roller":
//         return <Rect x={50} y={50} width={width * scale} height={height * scale} fill={selectedColor} />;
//       case "vertical":
//         return Array.from({ length: 5 }).map((_, i) => (
//           <Rect
//             key={i}
//             x={50 + i * (width / 5) * scale}
//             y={50}
//             width={(width / 5) * scale}
//             height={height * scale}
//             fill={selectedColor}
//             stroke="#333"
//             strokeWidth={1}
//           />
//         ));
//       case "venetian":
//         return Array.from({ length: 10 }).map((_, i) => (
//           <Rect
//             key={i}
//             x={50}
//             y={50 + (i * height) / 10 * scale}
//             width={width * scale}
//             height={(height / 10) * scale}
//             fill={selectedColor}
//             stroke="#333"
//             strokeWidth={0.5}
//           />
//         ));
//       case "panel":
//         return Array.from({ length: 3 }).map((_, i) => (
//           <Rect
//             key={i}
//             x={50 + i * (width / 3) * scale}
//             y={50}
//             width={(width / 3) * scale}
//             height={height * scale}
//             fill={selectedColor}
//             stroke="#333"
//             strokeWidth={1}
//           />
//         ));
//       case "awning":
//         return <Line points={[50, 50, 50 + width * scale, 50, 50 + (width * 0.8) * scale, 50 + height * scale, 50 + (width * 0.2) * scale, 50 + height * scale]} closed fill={selectedColor} />;
//       case "curtain":
//         return <Rect x={50} y={50} width={width * scale} height={height * scale} fill={selectedColor} cornerRadius={50} />;
//       case "shutter":
//         return Array.from({ length: 6 }).map((_, i) => (
//           <Rect
//             key={i}
//             x={50}
//             y={50 + (i * height) / 6 * scale}
//             width={width * scale}
//             height={(height / 6) * scale}
//             fill={selectedColor}
//             stroke="#333"
//             strokeWidth={1}
//           />
//         ));
//       default:
//         return null;
//     }
//   };

//   return (
//     <div style={{ display: "flex", gap: "20px" }}>
//       {/* 설정 패널 */}
//       <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
//         <h3>블라인드 종류</h3>
//         {blindTypes.map((type) => (
//           <button
//             key={type}
//             onClick={() => setSelectedType(type)}
//             style={{
//               padding: "8px",
//               backgroundColor: selectedType === type ? "#2a9d8f" : "#ccc",
//               color: selectedType === type ? "#fff" : "#000",
//               border: "none",
//               cursor: "pointer",
//             }}
//           >
//             {type}
//           </button>
//         ))}

//         <h3>색상 선택</h3>
//         <div style={{ display: "flex", gap: "5px" }}>
//           {colors.map((color) => (
//             <div
//               key={color}
//               onClick={() => setSelectedColor(color)}
//               style={{
//                 width: "30px",
//                 height: "30px",
//                 backgroundColor: color,
//                 border: selectedColor === color ? "3px solid #333" : "1px solid #ccc",
//                 cursor: "pointer",
//               }}
//             />
//           ))}
//         </div>

//         <h3>크기 입력 (픽셀 단위)</h3>
//         <label>
//           폭: 
//           <input type="number" value={width} onChange={(e) => setWidth(Number(e.target.value))} />
//         </label>
//         <label>
//           높이: 
//           <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} />
//         </label>

//         <h3>배경 이미지 업로드</h3>
//         <input type="file" accept="image/*" onChange={handleImageUpload} />
//       </div>

//       {/* 시뮬레이터 화면 */}
//       <Stage width={600} height={400} style={{ border: "1px solid #ccc" }}>
//         <Layer>
//           {image && <KonvaImage image={image} x={0} y={0} width={600} height={400} />}
//           {renderBlind()}
//         </Layer>
//       </Stage>
//     </div>
//   );
// };

// export default BlindSimulatorWithImage;
