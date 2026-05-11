import { useState } from "react";

function Register() {
  // Form input states
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Success/error message
  const [message, setMessage] = useState("");

  // Handles form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/register/",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            username,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Account created successfully.");
      } else {
        setMessage(data.error || "Registration failed.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong.");
    }
  };

  return (
    <main className="container">
      <h1>Create Account</h1>

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
          <label>Email:</label>

          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
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

        <button type="submit">Register</button>

        {message && (
          <p className="form-message">
            {message}
          </p>
        )}
      </form>
    </main>
  );
}

export default Register;