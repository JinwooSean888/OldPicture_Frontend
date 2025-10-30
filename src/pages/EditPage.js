// src/pages/EditPage.js

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./EditPage.css";

function EditPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const image = location.state?.image;
  const file = location.state?.file;

  const [resultImage, setResultImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isOriginal, setIsOriginal] = useState(true);
  const [doneMessage, setDoneMessage] = useState(false); // ✅ 메시지 상태 추가

  if (!image) {
    return (
      <div className="edit-wrapper">
        <h2 className="edit-title">업로드된 이미지가 없습니다.</h2>
        <button className="back-btn" onClick={() => navigate("/")}>
          ← 홈으로 돌아가기
        </button>
      </div>
    );
  }

  const runProcess = () => {
    if (!selected) {
      alert("먼저 기능을 선택해주세요!");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      if (selected === "color") {
        setResultImage(process.env.PUBLIC_URL + "/images/test_color.png");
      } else {
        setResultImage(process.env.PUBLIC_URL + "/images/test_water.png");
      }

      setLoading(false);
      setIsOriginal(false);

      // ✅ 완료 메시지 2.5초만 표시
      setDoneMessage(true);
      setTimeout(() => setDoneMessage(false), 2500);
    }, 1500);
  };

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = resultImage;
    link.download = "restored_photo.png";
    link.click();
  };

  return (
    <div className="edit-wrapper">
      <h2 className="edit-title">사진 복원하기</h2>

      <div className="edit-card">
        {/* ✅ 복원 완료 메시지 (2.5초 후 사라짐) */}
        {doneMessage && (
          <div className="complete-message">✅ 복원이 완료되었습니다</div>
        )}

        {/* ✅ 복원 후에만 Before / After 버튼 표시 */}
        {resultImage && !loading && (
          <div className="toggle-group">
            <button
              className={`toggle-btn ${isOriginal ? "active" : ""}`}
              onClick={() => setIsOriginal(true)}
            >
              원본 보기
            </button>

            <button
              className={`toggle-btn ${!isOriginal ? "active" : ""}`}
              onClick={() => setIsOriginal(false)}
            >
              복원 결과 보기
            </button>
          </div>
        )}

        {/* ✅ 이미지 영역 */}
        <div className="image-area">
          {loading ? (
            <div className="loading-box">
              <div className="spinner"></div>
              <p>AI가 이미지를 복원 중입니다...</p>
            </div>
          ) : (
            <img
              src={isOriginal ? image : resultImage || image}
              alt="preview"
              className="edit-image"
            />
          )}
        </div>

        {/* ✅ 복원 전 → 기능 선택 + 복원하기 버튼 */}
        {!resultImage && !loading && (
          <>
            <div className="option-group">
              <button
                className={`option-btn ${selected === "color" ? "active" : ""}`}
                onClick={() => setSelected("color")}
              >
                AI 컬러 복원
              </button>

              <button
                className={`option-btn ${selected === "water" ? "active" : ""}`}
                onClick={() => setSelected("water")}
              >
                수채화 변환
              </button>
            </div>

            <button className="run-btn" onClick={runProcess}>
              복원하기
            </button>
          </>
        )}

        {/* ✅ 복원 후 → 다운로드 버튼 */}
        {resultImage && !loading && (
          <button className="run-btn" onClick={downloadImage}>
            다운로드
          </button>
        )}
      </div>
    </div>
  );
}

export default EditPage;
