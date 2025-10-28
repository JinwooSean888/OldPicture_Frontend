import React, { useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../App.css";
import RestoreExamples from "../components/RestoreExamples";

function Home() {
  const uploadSectionRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("goUpload") === "true") {
      setTimeout(() => {
        uploadSectionRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    }
  }, [location]);

  const scrollToUpload = () => {
    uploadSectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const previewURL = URL.createObjectURL(file);

    navigate("/edit", {
      state: { image: previewURL, file: file },
    });
  };

  return (
    <>
      {/* ✅ Hero Section: 배경을 JS inline 스타일로 적용 */}
      <section
        className="hero"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)),
            url("/images/hero-bg.jpg")
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="hero-content">
          <h1>소중한 추억을 되살리세요</h1>
          <p>손상되고 바랜 옛날 사진을 AI 기술로 복원합니다</p>
          <button className="restore-btn" onClick={scrollToUpload}>
            Start Editing
          </button>
        </div>
      </section>

      {/* ✅ Upload Section */}
      <section className="upload-section" ref={uploadSectionRef}>
        <h2>추억을 복원하세요</h2>

        <div className="upload-box">
          <label htmlFor="file-upload" className="upload-label">
            <div className="upload-icon">⬆</div>
            <p>사진을 업로드해주세요</p>
          </label>

          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
        </div>
      </section>

      {/* ✅ Steps Section */}
      <section className="steps-section">
        <h2>이렇게 간단합니다</h2>

        <div className="steps-container">
          <div className="step-card">
            <div className="step-icon-circle">
              <span className="step-icon-symbol">⬆</span>
            </div>
            <div className="step-number">1</div>
            <h3>사진 업로드</h3>
            <p>복원하고 싶은 옛날 사진을 업로드하세요</p>
          </div>

          <div className="step-card">
            <div className="step-icon-circle">
              <span className="step-icon-symbol">✨</span>
            </div>
            <div className="step-number">2</div>
            <h3>AI 복원</h3>
            <p>최신 AI 기술로 자동으로 사진을 복원합니다</p>
          </div>

          <div className="step-card">
            <div className="step-icon-circle">
              <span className="step-icon-symbol">⬇</span>
            </div>
            <div className="step-number">3</div>
            <h3>다운로드</h3>
            <p>복원된 고화질 사진을 다운로드하세요</p>
          </div>
        </div>
      </section>

      <RestoreExamples />
    </>
  );
}

export default Home;
