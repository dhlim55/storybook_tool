import React, { useEffect, useRef } from "react";
import './StoryPage.css'

const StoryPage = ({ title, text, image, audio }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  }, [audio]);

  return (
    <div className="story-page">
      <div className="story-content">
        <img className="story-image" src={image} alt="Story scene" />
        <div className="story-text">
          <h2>{title}</h2>
          <p>{text}</p>
          <button className="audio-button" onClick={() => audioRef.current.play()}>
            🔊
          </button>
          <audio ref={audioRef} src={audio} />
        </div>
      </div>
    </div>
  );
};

export default StoryPage;
