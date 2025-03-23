import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StoryPage from "../components/StoryPage";

const StoryBook = () => {
  const { id } = useParams();
  const [story, setStory] = useState(null);

  useEffect(() => {
    const savedStories = JSON.parse(localStorage.getItem("stories")) || [];
    const foundStory = savedStories.find((s) => s.id === parseInt(id));
    setStory(foundStory);
  }, [id]);

  if (!story) {
    return <div>스토리를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="storybook-container">
      <h1>{story.title}</h1>
      {story.pages.map((page, index) => (
        <StoryPage key={index} {...page} />
      ))}
    </div>
  );
};

export default StoryBook;
