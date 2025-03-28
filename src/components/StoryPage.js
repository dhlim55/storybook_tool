import React, { useEffect, useRef } from "react";
import './StoryPage.css';

const StoryPage = ({ pages }) => {
  return (
    <div className="story-page">
      {pages.map((page, index) => (
        <PageSection key={index} index={index} {...page} />
      ))}
    </div>
  );
};

const PageSection = ({ text, image, audio, index }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      //audioRef.current.play();
    }
  }, [audio]);

  return (
    <div className="page-section">
      <h2>{index + 1}장</h2>
      <div className="story-content">
        <img className="story-image" src={image} alt={`Page ${index + 1}`} />
        <div className="story-text">
          <p>{text}</p>
          {audio && (
            <>
              <button
                className="audio-button"
                onClick={() => audioRef.current.play()}
              >
                🔊 효과음 재생
              </button>
              <audio ref={audioRef} src={audio} />
            </>
          )}
        </div>
      </div>
      <hr className="page-divider" />
    </div>
  );
};

export default StoryPage;
