import { useState, useEffect } from "react";
import "./MainPage.css";
import images1 from "./images/images1.jpg";
import images2 from "./images/images2.jpg";

function MainPage() {
  const images = [images1, images2];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="MainPage">
      <div className="LeftSection">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="변환 예시"
            className={`MainImage ${index === currentIndex ? "active" : ""}`}
          />
        ))}
      </div>
      <div className="RightSection">
        <h1 className="MainTitle">큰제목넣기</h1>
        <h2 className="SubTitle">
          사진을 간단히 복원하고 새롭게 재탄생시켜보세요.
        </h2>
        <div className="ButtonWrapper">
          <button
            className="StartButton"
            onClick={() => (window.location.href = "/function")}
          >
            Start Editing
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
