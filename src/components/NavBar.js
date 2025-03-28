import React from "react";
import { Link } from "react-router-dom";

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
                <Link to={`/storybook/${story.id}`} style={{ color: 'white', textDecoration: 'none' }}>
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
