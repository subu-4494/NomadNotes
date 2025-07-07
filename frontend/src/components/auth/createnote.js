import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [topic, setTopic] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleImageChange(e) {
    setImages(Array.from(e.target.files));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("topic", topic);
    images.forEach((imageFile) => {
      formData.append("images", imageFile);
    });

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/notes/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        alert("Note created successfully!");
        navigate("/dashboard");
      } else {
        setError(data.message || "Failed to create note");
      }
    } catch (err) {
      setLoading(false);
      setError("Error: " + err.message);
    }
  }

  return (
    <>
      {/* Video Background */}
      <div className="video-background">
        <video src="/assets/vid10.mp4" autoPlay loop muted />
        <video src="/assets/vid11.mp4" autoPlay loop muted />
        <video src="/assets/vid12.mp4" autoPlay loop muted />
      </div>
      <div className="video-overlay"></div>

      {/* Form wrapper to center */}
      <div className="form-wrapper">
        <div className="create-note-container">
          <h2>Create New Note</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={5}
            />
            <input
              type="text"
              placeholder="Topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
            />
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />

            <button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Note"}
            </button>
          </form>
        </div>
      </div>

      {/* CSS */}
      <style>
        {`
        .video-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: -2;
          display: flex;
          flex-wrap: wrap;
        }

        .video-background video {
          flex: 1 1 33%;
          min-width: 33%;
          min-height: 33%;
          object-fit: cover;
          filter: brightness(0.4) contrast(1.1);
        }

        .video-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.5);
          z-index: -1;
        }

        .form-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }

        .create-note-container {
          max-width: 600px;
          width: 90%;
          background: rgba(0,0,0,0.6);
          padding: 20px;
          border-radius: 10px;
          color: #fff;
        }

        .create-note-container h2 {
          text-align: center;
          margin-bottom: 20px;
        }

        .create-note-container form {
          display: flex;
          flex-direction: column;
        }

        .create-note-container input,
        .create-note-container textarea {
          margin-bottom: 10px;
          padding: 10px;
          border: none;
          border-radius: 5px;
        }

        .create-note-container button {
          padding: 10px;
          background-color: #4A90E2;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .create-note-container button:disabled {
          background-color: #6ea1e6;
          cursor: not-allowed;
        }
        `}
      </style>
    </>
  );
}

export default CreateNote;
