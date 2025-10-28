import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./EditPage.css";

function EditPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const image = location.state?.image;
  const originalFile = location.state?.file;

  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [resultImage, setResultImage] = useState(null);

  if (!image || !originalFile) {
    return (
      <div style={{ padding: 40 }}>
        <h2>이미지가 없습니다.</h2>
        <button onClick={() => navigate("/")}>홈으로 돌아가기</button>
      </div>
    );
  }

  async function runWatercolorAPI(file) {
    const form = new FormData();

    form.append("file", file);
    form.append("strength", 0.55);
    form.append("cfg", 7.0);
    form.append("steps", 22);
    form.append("controlnet", "canny");
    form.append("paper_texture", 0.25);
    form.append("bleed", 3);

    const res = await fetch("http://127.0.0.1:8000/api/watercolor", {
      method: "POST",
      body: form,
    });

    if (!res.ok) throw new Error("API 요청 실패");

    const data = await res.json();
    return data.result_url;
  }

  const handleAiProcess = async () => {
    setLoading(true);
    setDone(false);

    try {
      const resultUrl = await runWatercolorAPI(originalFile);
      setResultImage("http://127.0.0.1:8000" + resultUrl);
      setDone(true);
    } catch (err) {
      console.error(err);
      alert("AI 처리 중 오류 발생!");
    }

    setLoading(false);
  };

  return (
    <div className="edit-container">
      <div className="edit-header">
        <button
          className="back-btn"
          onClick={() => navigate("/?goUpload=true")}
        >
          ← 다른 사진 선택
        </button>
        <h2>업로드된 사진</h2>
      </div>

      <div className="edit-content">
        <div className="edit-image-box">
          <img
            src={resultImage || image}
            alt="edit-preview"
            className="edit-image"
          />

          {done && (
            <div className="done-message">✅ 복원이 완료되었습니다!</div>
          )}
        </div>

        <div className="edit-panel">
          <h3>편집 도구</h3>

          <div className="edit-buttons">
            <button className="tool-btn">흑백 → 컬러</button>
            <button className="tool-btn">2D 변환</button>
            <button className="tool-btn">수채화 스타일</button>
            <button className="tool-btn">노이즈 제거</button>
          </div>

          <button
            className="ai-btn"
            disabled={loading}
            onClick={handleAiProcess}
          >
            {loading ? "처리중..." : "AI 복원하기"}
          </button>

          {loading && (
            <div className="loading-box">
              <div className="spinner"></div>
              <p>AI 복원 중...</p>
            </div>
          )}

          <div className="panel-bottom">
            <button className="reset-btn" onClick={() => setResultImage(null)}>
              초기화
            </button>

            {resultImage && (
              <a
                href={resultImage}
                download="restored.png"
                className="download-btn"
              >
                다운로드
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPage;
