// src/pages/FirstPage.js

import React from "react";
import { useNavigate } from "react-router-dom";
import "./FirstPage.css";

function FirstPage() {
  const navigate = useNavigate();

  // ✅ 파일 선택 → 즉시 다음 페이지로 이동
  const handleFileUpload = (e) => {
    const uploaded = e.target.files[0];
    if (!uploaded) return;

    const previewURL = URL.createObjectURL(uploaded);

    navigate("/edit", {
      state: {
        image: previewURL,
        file: uploaded,
      },
    });
  };

  return (
    <div className="first-wrapper">
      {/* ✅ Hero Section */}
      <div className="hero">
        <div className="hero-left-text">
          <h1>소중한 추억을 되살리세요</h1>
          <p>AI 기술로 오래된 사진을 선명하게 복원합니다</p>
        </div>
      </div>

      {/* ✅ Steps Section */}
      <div className="steps-section">
        <div className="step-item">
          <div className="step-icon">⬆</div>
          <h3>1. 사진 업로드</h3>
          <p>복원할 사진을 업로드하세요.</p>
        </div>

        <div className="step-item">
          <div className="step-icon">✦</div>
          <h3>2. AI 복원</h3>
          <p>최신 AI 기술로 자동 복원됩니다.</p>
        </div>

        <div className="step-item">
          <div className="step-icon">⬇</div>
          <h3>3. 다운로드</h3>
          <p>복원된 사진을 저장하세요.</p>
        </div>
      </div>

      {/* ✅ 업로드 영역 */}
      <div className="upload-section">
        <h2>추억을 복원하세요</h2>

        <label className="upload-box">
          <div className="upload-arrow">⬆</div>
          <p>사진을 업로드해주세요</p>

          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            style={{ display: "none" }}
          />
        </label>
      </div>
    </div>
  );
}

export default FirstPage;
