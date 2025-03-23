import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import storiesData from "../data/stories";
import UploadStory from "../components/ UploadStory";

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
      pages: [{ text: newStory.text, image: newStory.image, audio: newStory.audio }],
    };
    setStories([...stories, newStoryData]);
  };

  return (
    <div>
      <UploadStory onUpload={handleUpload} />
      <ul>
        {stories.map((story) => (
          <li key={story.id}>
            <Link to={`/storybook/${story.id}`}>{story.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
