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
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [text3, setText3] = useState("");
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);
  const [stories, setStories] = useState([]);

  const handleImageUpload = (e, page) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
  
    if (page === 1) setImage1(url);
    if (page === 2) setImage2(url);
    if (page === 3) setImage3(url);
  };
  

  const handleAudioUpload = (e) => {
    const file = e.target.files[0];
    setAudio(URL.createObjectURL(file));
  };

  const handleSubmit = () => {
    if (!title || !audio) {
      alert("제목과 오디오는 필수입니다.");
      return;
    }
  
    const pages = [];
  
    if (text1 && image1) pages.push({ text: text1, image: image1, audio });
    if (text2 && image2) pages.push({ text: text2, image: image2,});
    if (text3 && image3) pages.push({ text: text3, image: image3 });
  
    if (pages.length === 0) {
      alert("최소한 한 장 이상 입력해주세요.");
      return;
    }
  
    
    const newStory = {
      id: Date.now(),
      title,
      pages,
    };
  
    const saved = JSON.parse(localStorage.getItem("stories")) || [];
    const updated = [...saved, newStory];
    localStorage.setItem("stories", JSON.stringify(updated));
  
    onUpload(newStory);
  
    // 초기화
    setTitle("");
    setText1(""); setText2(""); setText3("");
    setImage1(null); setImage2(null); setImage3(null);
    setAudio(null);
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

        {/* 1장 */}
        <div className="pageBlock">
          <textarea
            placeholder="1장 내용"
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            className="textarea"
          />
          <label htmlFor="imageUpload1" className="fileLabel">
            1장 이미지 업로드
            <input
              type="file"
              accept="image/*"
              id="imageUpload1"
              onChange={(e) => handleImageUpload(e, 1)}
              className="fileInput"
            />
          </label>
          {image1 && <img src={image1} alt="1장 이미지" className="previewImage" />}
        </div>


        {/* 2장 */}
        <textarea
          placeholder="2장 내용"
          value={text2}
          onChange={(e) => setText2(e.target.value)}
          className="textarea"
        />
          <label htmlFor="imageUpload2" className="fileLabel">
            2장 이미지 업로드
            <input
              type="file"
              accept="image/*"
              id="imageUpload2"
              onChange={(e) => handleImageUpload(e, 2)}
              className="fileInput"
          />
          </label>
          {image2 && <img src={image2} alt="2장 이미지" className="previewImage" />}

        {/* 3장 */}
        <textarea
          placeholder="3장 내용"
          value={text3}
          onChange={(e) => setText3(e.target.value)}
          className="textarea"
        />
        <label htmlFor="imageUpload3" className="fileLabel">
          3장 이미지 업로드
          <input
            type="file"
            accept="image/*"
            id="imageUpload3"
            onChange={(e) => handleImageUpload(e, 3)}
            className="fileInput"
        />
        </label>
        {image3 && <img src={image3} alt="3장 이미지" className="previewImage" />}

          {/* 업로드된 이미지 미리보기 */}
          {image && <img src={image} alt="업로드된 이미지" className="previewImage" />}

          {/* 오디오 업로드 */}
          <label htmlFor="audioUpload" className="fileLabel">
            효과음 파일 업로드
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

