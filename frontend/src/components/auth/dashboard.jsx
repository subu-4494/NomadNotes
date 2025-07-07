import React, { useEffect, useState } from "react";
import { getNotes, deleteNote } from "../../services/api";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";
import PostCard from "./postcard";

function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalImages, setModalImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    setLoading(true);
    setError(null);
    try {
      const data = await getNotes();
      setNotes(data);
    } catch (err) {
      setError(err?.message || "Failed to load notes.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        await deleteNote(id);
        setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
      } catch (err) {
        alert(err?.message || "Failed to delete note.");
      }
    }
  }

  function handleUpdate(id) {
    navigate(`/notes/edit/${id}`);
  }

  function handleCreate() {
    navigate("/notes/create");
  }

  function handleLogout() {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.clear();
      navigate("/login");
    }
  }

  function openModal(images, index) {
    setModalImages(images);
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setModalImages([]);
    setCurrentImageIndex(0);
  }

  function goToNextImage() {
    setCurrentImageIndex((prev) => (prev + 1) % modalImages.length);
  }

  function goToPreviousImage() {
    setCurrentImageIndex((prev) => (prev - 1 + modalImages.length) % modalImages.length);
  }

  const username = localStorage.getItem("username") || "User";

  return (
    <>
      {/*  Video Background */}
      <div className="video-background">
        {[...Array(9)].map((_, i) => (
          <video
            key={i}
            src={`/assets/vid${i + 1}.mp4`}
            autoPlay
            loop
            muted
          />
        ))}
        <div className="video-overlay"></div>
      </div>

      <div className="dashboard-container">
        <header className="dashboard-header">
          <h1>Welcome, {username}</h1>
          <p style={{ fontSize: "16px", color: "#fff", marginTop: "5px" }}>
            ✈️ Tell me, how was your last trip {username}?
          </p>
          <button onClick={handleLogout}>Logout</button>
        </header>

        {loading && <p className="loading-text">Loading your notes...</p>}
        {error && <p className="error">{error}</p>}

        <div
          className="create-post-wrapper"
          style={{ margin: "20px 0", textAlign: "center" }}
        >
          <button onClick={handleCreate} className="create-post-button">
            Create New Post
          </button>
        </div>

        <div className="notes-list">
          {notes.map((note) => (
            <PostCard
              key={note._id}
              note={note}
              openModal={openModal}
              handleDelete={handleDelete}
            />
          ))}
        </div>

        {isModalOpen && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <img
                src={modalImages[currentImageIndex]}
                alt="Zoomed"
                className="modal-image"
              />
              <button className="modal-close" onClick={closeModal}>
                &times;
              </button>

              {modalImages.length > 1 && (
                <div className="carousel-controls">
                  <button
                    className="carousel-button"
                    onClick={goToPreviousImage}
                  >
                    &#8592;
                  </button>
                  <button className="carousel-button" onClick={goToNextImage}>
                    &#8594;
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Dashboard;
