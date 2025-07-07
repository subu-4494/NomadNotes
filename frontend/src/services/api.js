// src/services/api.js

const API_BASE_URL = "https://nomadnotes-backend.onrender.com/api";

// LOGIN
export async function loginUser(credentials) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    return await response.json();
  } catch (err) {
    return { message: "Network error. Please try again later." };
  }
}

// REGISTER
export async function registerUser(credentials) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    return data;
  } catch (err) {
    return { message: err.message || "Network error" };
  }
}

// GET NOTES
export async function getNotes() {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE_URL}/notes`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch notes");
  return res.json();
}

// CREATE NOTE (with image upload)
export async function createNote(formData) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_BASE_URL}/notes/create`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData, // must be FormData (not JSON)
  });

  if (!res.ok) throw new Error("Failed to create note");
  return res.json();
}

// DELETE NOTE
export async function deleteNote(id) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE_URL}/notes/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to delete note");
  return res.json();
}
