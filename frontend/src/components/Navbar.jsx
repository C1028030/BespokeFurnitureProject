import { Link } from "react-router-dom";

function Navbar({ user, setUser }) {
  // Checks if user exists
  const isAuthenticated = !!user;

  // Checks if logged-in user is staff/admin
  const isStaff = user?.is_staff;

  return (
    <nav className="site-navbar">
      <div className="nav-container">
        {/* Website logo/brand */}
        <Link to="/" className="brand-logo">
          Bespoke Furniture
        </Link>

        <div className="nav-links">
          {/* Public links */}
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/create">Create Order</Link>
          <Link to="/track-order">Track Order</Link>

          {isAuthenticated ? (
            <>
              {/* Logged-in user profile */}
              <Link to="/profile">Profile</Link>

              {/* Staff/admin-only links */}
              {isStaff && (
                <>
                  <Link to="/orders">Orders</Link>
                  <Link to="/manufacturing">Manufacturing</Link>
                  <Link to="/delivery">Delivery</Link>
                  <Link to="/dashboard">Dashboard</Link>
                  <Link to="/customer-history">Customer History</Link>
                </>
              )}

              {/* Logout button */}
              <button
                className="logout-link"
                onClick={() => {
                  // Removes login data
                  localStorage.removeItem("user");

                  // Updates React state immediately
                  setUser(null);
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-button">
                Login
              </Link>

              <Link to="/register" className="nav-button highlight">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;