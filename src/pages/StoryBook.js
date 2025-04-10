import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StoryPage from "../components/StoryPage";

const GlobalStyles = () => {
  return (
    <style>
      {`
        @font-face {
          font-family: 'GowunBatang-Regular';
          src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/GowunBatang-Regular.woff') format('woff');
          font-weight: normal;
          font-style: normal;
        }
        body {
          font-family: 'GowunBatang-Regular', serif;
          margin: 0;
          padding: 0;
          background-color: #f9f9f9;
        }
      `}
    </style>
  );
};


const StoryBook = () => {
  const { id } = useParams();
  const [story, setStory] = useState(null);

  useEffect(() => {
    const savedStories = JSON.parse(localStorage.getItem("stories")) || [];
    const foundStory = savedStories.find((s) => s.id === parseInt(id));
    setStory(foundStory);
  }, [id]);

  if (!story) {
    return <div>스토리를 찾을 수 없습니다!</div>;
  }

  return (
    <div className="storybook-container">
      <GlobalStyles />
      <h1 style={{ textAlign: "center" }}>{story.title}</h1>
      <StoryPage pages={story.pages} />
    </div>
  );
  
};

export default StoryBook;
