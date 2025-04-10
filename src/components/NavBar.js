import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ stories }) => {

  const sortedStories = [...stories].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <nav className="navBar">
      <h1 className="logo">StoryWeaver</h1>
      <h2 className="sectionTitle">동화목록</h2>

      <ul className="storyList">
        {sortedStories.length === 0 ? (
          <p className="emptyText">동화가 없습니다.</p>
        ) : (
          sortedStories.map((story, index) => (
            <li key={index} className="storyItem">
              <Link to={`/storybook/${story.id}`}>
                {story.title}
              </Link>
            </li>
          ))
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
