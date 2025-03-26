import React from "react";

const NavBar = ({ stories }) => {
  return (
    <nav className="navBar">
      <h1 className="logo">StoryWeaver</h1>
      <ul className="storyList">
        {stories.length === 0 ? (
          <p className="emptyText">동화가 없습니다.</p>
        ) : (
          stories.map((story, index) => (
            <li key={index} className="storyItem">
              {story.title}
            </li>
          ))
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
