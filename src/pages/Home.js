import React, { useState, useEffect } from "react";
import storiesData from "../data/stories";
import UploadStory from "../components/ UploadStory";
import NavBar from "../components/NavBar";
import "../components/UploadStory.css"; // container, navBar, mainContent 스타일 포함

const Home = () => {
  const [stories, setStories] = useState(() => {
    const savedStories = localStorage.getItem("stories");
    return savedStories ? JSON.parse(savedStories) : storiesData;
  });

  useEffect(() => {
    localStorage.setItem("stories", JSON.stringify(stories));
  }, [stories]);

  const handleUpload = (newStory) => {
    const newStoryData = {
      id: stories.length + 1,
      title: newStory.title,
      pages: [
        {
          text: newStory.text,
          image: newStory.image,
          audio: newStory.audio,
        },
      ],
    };
    setStories([...stories, newStoryData]);
  };

  return (
    <div className="container">
      <NavBar stories={stories} />
      <UploadStory onUpload={handleUpload} />
    </div>
  );
};

export default Home;
