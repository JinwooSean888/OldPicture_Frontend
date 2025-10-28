import React from "react";
import ReactCompareImage from "react-compare-image";
import "./RestoreExamples.css";

function RestoreExamples() {
  return (
    <section className="examples-section">
      <h2>복원 예시</h2>
      <p className="examples-sub">
        AI 기술로 복원된 실제 사진들을 확인해보세요
      </p>

      <div className="examples-container">
        <div className="example-card">
          <ReactCompareImage
            leftImage="/images/example1_before.jpg"
            rightImage="/images/example1_after.png"
            sliderLineColor="#ffffff"
            handleSize={40}
            hover={false}
            sliderLineOnlyOnDrag={true}
          />
        </div>
      </div>
    </section>
  );
}

export default RestoreExamples;
