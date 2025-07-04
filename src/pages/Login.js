import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // default role is user
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      if (res.data.role !== role) {
        alert(`You are not authorized to login as ${role}`);
        return;
      }

      // Save login info in sessionStorage
      sessionStorage.setItem("role", res.data.role);

      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (err) {
      alert("Login failed: " + err.response?.data?.error || "Unknown error");
    }
  };

  return (
    <div className="form-container">
      <h2 className="loginheading">Login to continue</h2>
      <form onSubmit={handleLogin}>
        <div className="role-selector">
          <label>
          <input
            type="radio"
            name="role"
            value="user"
            checked={role === "user"}
            onChange={() => setRole("user")}
          />
          User
          </label>
          <label>
          <input
            type="radio"
            name="role"
            value="admin"
            checked={role === "admin"}
            onChange={() => setRole("admin")}
          />
          Admin
          </label>
        </div>

        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="loginsubmit">
          <button type="submit">Login</button>
        </div>
      </form>

      {role === "user" && (
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      )}
    </div>
  );
}

export default Login;
