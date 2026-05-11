import { Link } from "react-router-dom";

function Logout() {
  return (
    <main className="container">
      <div className="logout-container">
        <h1>You have been logged out</h1>
        <p>Thank you for using Bespoke Furniture Creations.</p>

        <Link className="button-link" to="/login">
          Login Again
        </Link>

        <Link className="button-link secondary" to="/">
          Return Home
        </Link>
      </div>
    </main>
  );
}

export default Logout;