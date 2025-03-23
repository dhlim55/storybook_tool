import React, { useState } from "react";

// 폰트 적용을 위한 전역 스타일 추가
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
      <div style={styles.container}>
        {/* 왼쪽 네비게이션 바 */}
        <nav style={styles.navBar}>
          <h1 style={styles.logo}>StoryWeaver</h1>
          <ul style={styles.storyList}>
            {stories.length === 0 ? (
              <p style={styles.emptyText}>동화가 없습니다.</p>
            ) : (
              stories.map((story, index) => (
                <li key={index} style={styles.storyItem}>
                  {story.title}
                </li>
              ))
            )}
          </ul>
        </nav>

        {/* 오른쪽 입력 폼 */}
        <div style={styles.mainContent}>
          <h2 style={styles.heading}>새로운 동화 추가</h2>
          <input
            type="text"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
          />
          <textarea
            placeholder="내용"
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={styles.textarea}
          />
          
          {/* 이미지 업로드 */}
          <label htmlFor="imageUpload" style={styles.fileLabel}>
            Image File Upload
            <input
              type="file"
              accept="image/*"
              id="imageUpload"
              onChange={handleImageUpload}
              style={styles.fileInput}
            />
          </label>

          {/* 업로드된 이미지 미리보기 */}
          {image && <img src={image} alt="업로드된 이미지" style={styles.previewImage} />}

          {/* 오디오 업로드 */}
          <label htmlFor="audioUpload" style={styles.fileLabel}>
            Audio File Upload
            <input
              type="file"
              accept="audio/*"
              id="audioUpload"
              onChange={handleAudioUpload}
              style={styles.fileInput}
            />
          </label>

          {/* 업로드된 오디오 미리보기 */}
          {audio && <audio controls src={audio} style={styles.audioPreview}></audio>}

          <button onClick={handleSubmit} style={styles.button}>완성된 동화 보기</button>
        </div>
      </div>
    </>
  );
};

// 스타일 정의
const styles = {
  container: {
    display: "flex",
    width: "100vw",
    height: "100vh",
  },
  navBar: {
    width: "250px",
    backgroundColor: "#54BD95",
    color: "#fff",
    padding: "20px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
  },
  logo: {
    fontSize: "35px",
    fontWeight: "bold",
    marginBottom: "20px",
    fontFamily: "'GowunBatang-Regular', serif",
  },
  storyList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  emptyText: {
    color: "#ddd",
    fontSize: "14px",
  },
  storyItem: {
    padding: "10px",
    backgroundColor: "#0056b3",
    borderRadius: "5px",
    marginBottom: "5px",
    cursor: "pointer",
    textAlign: "center",
    fontFamily: "'GowunBatang-Regular', serif",
  },
  mainContent: {
    flex: 1,
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    fontFamily: "'GowunBatang-Regular', serif",
  },
  input: {
    width: "100%",
    maxWidth: "500px",
    padding: "12px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
    marginBottom: "10px",
    boxSizing: "border-box",
    fontFamily: "'GowunBatang-Regular', serif",
  },
  textarea: {
    width: "100%",
    maxWidth: "500px",
    height: "150px",
    padding: "12px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
    marginBottom: "10px",
    resize: "none",
    boxSizing: "border-box",
    fontFamily: "'GowunBatang-Regular', serif",
  },
  fileLabel: {
    display: "block",
    width: "100%",
    maxWidth: "500px",
    padding: "12px",
    backgroundColor: "#54BD95",
    color: "#000",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    textAlign: "center",
    marginBottom: "10px",
    boxSizing: "border-box",
    
  },
  fileInput: {
    display: "none",
  },
  previewImage: {
    width: "100%",
    maxWidth: "300px",
    marginTop: "10px",
    borderRadius: "5px",
  },
  audioPreview: {
    marginTop: "10px",
    width: "100%",
    maxWidth: "400px",
  },
  button: {
    width: "100%",
    maxWidth: "500px",
    padding: "14px",
    backgroundColor: "#54BD95",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "18px",
    marginTop: "10px",
    boxSizing: "border-box",
    fontFamily: "'GowunBatang-Regular', serif",
  },
};

export default UploadStory;
