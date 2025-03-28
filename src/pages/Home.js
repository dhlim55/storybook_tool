import React, { useState, useEffect } from "react";
import storiesData from "../data/stories";
import UploadStory from "../components/ UploadStory";
import NavBar from "../components/NavBar";
import "../components/UploadStory.css";

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
      pages: newStory.pages, // ✅ 전체 페이지 배열을 그대로 넣기!
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
