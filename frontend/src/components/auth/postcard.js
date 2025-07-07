import React, { useState } from "react";
import "./postcard.css";

function PostCard({ note, handleDelete, handleUpdate }) {
  const [currentImage, setCurrentImage] = useState(0);

  const handlePrev = () => {
    setCurrentImage((prev) => (prev === 0 ? note.images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImage((prev) => (prev === note.images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="post-card">
      <div className="image-container">
        <img
          src={`https://nomadnotes-backend.onrender.com/uploads/${note.images[currentImage]}`}
          alt="Note Slide"
          className="main-image"
        />
        {note.images.length > 1 && (
          <>
            <button className="nav-button left" onClick={handlePrev}>
              ‹
            </button>
            <button className="nav-button right" onClick={handleNext}>
              ›
            </button>
            <div className="dots">
              {note.images.map((_, idx) => (
                <div
                  key={idx}
                  className={`dot ${idx === currentImage ? "active" : ""}`}
                  onClick={() => setCurrentImage(idx)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="post-details">
        <h3>{note.title}</h3>
        <p><strong>Topic:</strong> {note.topic}</p>
        <p className="note-content">{note.content}</p>
        <p className="timestamp">{new Date(note.createdAt).toLocaleString()}</p>

        <div className="post-actions">
          <button
            className="delete-btn"
            onClick={() => handleDelete(note._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
