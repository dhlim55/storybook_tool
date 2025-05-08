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
  const [audio1, setAudio1] = useState(null);
  const [audio2, setAudio2] = useState(null);
  const [audio3, setAudio3] = useState(null);

  const handleImageUpload = (e, page) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);

    if (page === 1) setImage1(url);
    if (page === 2) setImage2(url);
    if (page === 3) setImage3(url);
  };

  const handleAudioUpload = (e, page) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);

    if (page === 1) setAudio1(url);
    if (page === 2) setAudio2(url);
    if (page === 3) setAudio3(url);
  };

  const handleSubmit = () => {
    if (!title) {
      alert("제목은 필수입니다.");
      return;
    }

    const pages = [];

    if (text1) pages.push({ text: text1, image: image1, audio: audio1 });
    if (text2) pages.push({ text: text2, image: image2, audio: audio2 });
    if (text3) pages.push({ text: text3, image: image3, audio: audio3 });
    

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
    setAudio1(null); setAudio2(null); setAudio3(null);
  };

  return (
    <>
      <GlobalStyles />
      <div className="container">
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
            <label htmlFor="audioUpload1" className="fileLabel">
              1장 효과음 업로드
              <input
                type="file"
                accept="audio/*"
                id="audioUpload1"
                onChange={(e) => handleAudioUpload(e, 1)}
                className="fileInput"
              />
            </label>
            {audio1 && <audio controls src={audio1} className="audioPreview" />}
          </div>

          {/* 2장 */}
          <div className="pageBlock">
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
            <label htmlFor="audioUpload2" className="fileLabel">
              2장 효과음 업로드
              <input
                type="file"
                accept="audio/*"
                id="audioUpload2"
                onChange={(e) => handleAudioUpload(e, 2)}
                className="fileInput"
              />
            </label>
            {audio2 && <audio controls src={audio2} className="audioPreview" />}
          </div>

          {/* 3장 */}
          <div className="pageBlock">
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
            <label htmlFor="audioUpload3" className="fileLabel">
              3장 효과음 업로드
              <input
                type="file"
                accept="audio/*"
                id="audioUpload3"
                onChange={(e) => handleAudioUpload(e, 3)}
                className="fileInput"
              />
            </label>
            {audio3 && <audio controls src={audio3} className="audioPreview" />}
          </div>

          <button onClick={handleSubmit} className="button">완성된 동화 보기</button>
        </div>
      </div>
    </>
  );
};

export default UploadStory;
