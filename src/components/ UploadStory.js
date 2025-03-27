import React, { useState } from "react";
import "./UploadStory.css";

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

const UploadStory = ({ onUpload }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);
  const [stories, setStories] = useState([]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
  };

  const handleAudioUpload = (e) => {
    const file = e.target.files[0];
    setAudio(URL.createObjectURL(file));
  };

  const handleSubmit = () => {
    if (title && text && image && audio) {
      const newStory = { title, text, image, audio };
      setStories([...stories, newStory]); // 목록 업데이트
      onUpload(newStory);

      // 입력 필드 초기화
      setTitle("");
      setText("");
      setImage(null);
      setAudio(null);
    } else {
      alert("모든 항목을 입력해주세요!");
    }
  };

  return (
    <>
      <GlobalStyles />
      <div className="container">

        {/* 오른쪽 입력 폼 */}
        <div className="mainContent">
          <h2 className="heading">새로운 동화 추가</h2>
          <input
            type="text"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input"
          />
          <textarea
            placeholder="내용"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="textarea"
          />

          {/* 이미지 업로드 */}
          <label htmlFor="imageUpload" className="fileLabel">
            Image File Upload
            <input
              type="file"
              accept="image/*"
              id="imageUpload"
              onChange={handleImageUpload}
              className="fileInput"
            />
          </label>

          {/* 업로드된 이미지 미리보기 */}
          {image && <img src={image} alt="업로드된 이미지" className="previewImage" />}

          {/* 오디오 업로드 */}
          <label htmlFor="audioUpload" className="fileLabel">
            Audio File Upload
            <input
              type="file"
              accept="audio/*"
              id="audioUpload"
              onChange={handleAudioUpload}
              className="fileInput"
            />
          </label>

          {/* 업로드된 오디오 미리보기 */}
          {audio && <audio controls src={audio} className="audioPreview"></audio>}

          <button onClick={handleSubmit} className="button">완성된 동화 보기</button>
        </div>
      </div>
    </>
  );
};

export default UploadStory;
