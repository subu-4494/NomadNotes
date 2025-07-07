import React, { useState, useEffect } from "react";
import { loginUser } from "../../services/api";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("login-page");
    document.documentElement.classList.add("login-page");
    return () => {
      document.body.classList.remove("login-page");
      document.documentElement.classList.remove("login-page");
    };
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const data = await loginUser({ email, password });
    setLoading(false);

    if (data?.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      alert("Login successful!");
      navigate("/dashboard");
    } else {
      setError(data?.message || "Login failed");
    }
  }

  return (
    <>
      <div className="video-background">
        <video src="/assets/vid7.mp4" autoPlay loop muted />
        <video src="/assets/vid8.mp4" autoPlay loop muted />
        <video src="/assets/vid6.mp4" autoPlay loop muted />
        <video src="/assets/vid5.mp4" autoPlay loop muted />
        <video src="/assets/vid9.mp4" autoPlay loop muted />
        <video src="/assets/vid3.mp4" autoPlay loop muted />
        <video src="/assets/vid1.mp4" autoPlay loop muted />
        <video src="/assets/vid2.mp4" autoPlay loop muted />
        <video src="/assets/vid4.mp4" autoPlay loop muted />
      </div>

      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p>
          Don’t have an account? <Link to="/">Register here</Link>
        </p>
      </form>
    </>
  );
}

export default Login;
