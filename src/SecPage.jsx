import React, { useState } from "react";

function SecPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [showFunctions, setShowFunctions] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setResultImage(null); // 이전 결과 초기화
    }
  };

  const handleColorize = () => {
    if (selectedImage) setResultImage(selectedImage);
  };

  const handle2DTransform = () => {
    if (selectedImage) setResultImage(selectedImage);
  };

  return (
    <div className="FunctionPage">
      <h1 className="PageTitle">AI 추억 변환기</h1>

      <div
        className="MainFunctionButton"
        onClick={() => setShowFunctions(!showFunctions)}
      >
        기능 선택
        {showFunctions && (
          <div className="SubFunctionButtons">
            <button onClick={handleColorize}>컬러 변환</button>
            <button onClick={handle2DTransform}>2D 변환</button>
          </div>
        )}
      </div>

      <div className="UploadSection">
        <label className="UploadBox">
          {selectedImage ? (
            <img
              src={selectedImage}
              alt="선택된 이미지"
              className="PreviewImage"
            />
          ) : (
            <span>이미지를 업로드해주세요</span>
          )}
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </label>
      </div>

      {selectedImage && !resultImage && (
        <button
          className="ShowResultButton"
          onClick={() => setResultImage(selectedImage)}
        >
          결과 보기
        </button>
      )}

      {resultImage && (
        <div className="ResultSection">
          <h2>결과 이미지</h2>
          <img src={resultImage} alt="결과 이미지" className="ResultImage" />
        </div>
      )}
    </div>
  );
}

export default SecPage;
