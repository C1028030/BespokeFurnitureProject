import { useState } from "react";

function Login({ setUser }) {
  // Stores login form data
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Displays success/error messages
  const [message, setMessage] = useState("");

  // Handles login form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/login/",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Save user in localStorage
        localStorage.setItem("user", JSON.stringify(data));

        // Update React state so navbar changes immediately
        setUser(data);

        // Keep success message visible
        setMessage(`Welcome back, ${data.username}`);
      } else {
        setMessage(data.error || "Login failed.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong.");
    }
  };

  return (
    <main className="container">
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <p>
          <label>Username:</label>

          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </p>

        <p>
          <label>Password:</label>

          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </p>

        <button type="submit">Login</button>

        <p className="auth-switch">
          Don't have an account?
          <a href="/register"> Register here</a>
        </p>

        {message && (
          <p className="form-message">
            {message}
          </p>
        )}
      </form>
    </main>
  );
}

export default Login;