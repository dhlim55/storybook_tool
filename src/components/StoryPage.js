import React, { useRef, useState } from "react";
import './StoryPage.css';
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const StoryPage = ({ pages, title }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const audioRef = useRef(null);
  const navigate = useNavigate(); // Initialize navigate hook

  const currentAudio = pages[currentPage]?.audio;

  const handleAudioClick = () => {
    const audioEl = audioRef.current;
    if (!audioEl) return;

    if (audioEl.paused) {
      audioEl.play().catch((err) => {
        console.warn("재생 실패:", err.message);
      });
    } else {
      audioEl.pause();
    }
  };

  // Function to navigate back to the home page
  const handleGoHome = () => {
    navigate("/"); // Redirect to home page
  };

  return (
    <div className="story-page book-view">
      <div className="story-title-container">
        <h1 className="story-title">{title}</h1>
      </div>
      <SwitchTransition>
        <CSSTransition
          key={currentPage}
          timeout={300}
          classNames="slide"
        >
          <PageSection
            index={currentPage}
            {...pages[currentPage]}
            currentPage={currentPage}
            totalPages={pages.length}
            setCurrentPage={setCurrentPage}
          />
        </CSSTransition>
      </SwitchTransition>
      {/* Home Button */}
      <button className="home-button" onClick={handleGoHome}>Home</button>
    </div>
  );
};

const PageSection = ({ text, image, audio, index, currentPage, totalPages, setCurrentPage }) => {
  const audioRef = useRef(null);

  const handleAudioClick = () => {
    const audioEl = audioRef.current;
    if (!audioEl) return;

    if (audioEl.paused) {
      audioEl.play().catch((err) => {
        console.warn("재생 실패:", err.message);
      });
    } else {
      audioEl.pause();
    }
  };

  const goPrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const goNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="book-spread">
      {/* 왼쪽 페이지 */}
      <div className="page left-page">
        <img className="story-image" src={image} alt={`Page ${index + 1}`} />
      </div>

      {/* 오른쪽 페이지 */}
      <div className="page right-page">
        <h2>{index + 1}장</h2>
        <p className="story-text">{text}</p>

        {audio && (
          <>
            <button className="audio-button" onClick={handleAudioClick}>
              🔊 효과음 재생
            </button>
            <audio ref={audioRef} src={audio} />
          </>
        )}

        <div className="navigation-buttons">
          <button onClick={goPrev} disabled={currentPage === 0}>
            ⬅ 이전
          </button>

          <span className="page-indicator">
            {currentPage + 1} / {totalPages}
          </span>

          <button onClick={goNext} disabled={currentPage === totalPages - 1}>
            다음 ➡
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryPage;
