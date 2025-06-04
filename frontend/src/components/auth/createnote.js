import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [topic, setTopic] = useState("");
  const [images, setImages] = useState([]);  // Array for multiple images
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle multiple image selection
  function handleImageChange(e) {
    setImages(Array.from(e.target.files));  // convert FileList to Array
  }

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Prepare form data for file upload
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("topic", topic);

    // Append multiple images
    images.forEach((imageFile) => {
      formData.append("images", imageFile);
    });

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/notes/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // send auth token
        },
        body: formData, // send form data with images
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        alert("Note created successfully!");
        navigate("/dashboard");  // go back to dashboard after creating note
      } else {
        setError(data.message || "Failed to create note");
      }
    } catch (err) {
      setLoading(false);
      setError("Error: " + err.message);
    }
  }

  return (
    <div className="create-note-container" style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2>Create New Note</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={5}
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        />
        <input
          type="text"
          placeholder="Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        />
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          style={{ marginBottom: 15 }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4A90E2",
            color: "white",
            border: "none",
            borderRadius: 5,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Creating..." : "Create Note"}
        </button>
      </form>
    </div>
  );
}

export default CreateNote;
