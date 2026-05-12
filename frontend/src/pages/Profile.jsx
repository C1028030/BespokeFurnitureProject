import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";

function Profile() {
  // Gets user from localStorage
  const storedUser = localStorage.getItem("user");

  // Converts stored user safely
  const user = storedUser ? JSON.parse(storedUser) : null;

  // Stores matching orders
  const [orders, setOrders] = useState([]);

  // Tracks loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Stop if no user is logged in
    if (!user) {
      setLoading(false);
      return;
    }

    // Gets all orders from Django API
    fetch("http://127.0.0.1:8000/api/orders/")
      .then((response) => response.json())
      .then((data) => {
        // Keeps orders matching logged-in user's email
        const userOrders = data.filter(
          (order) =>
            order.email.toLowerCase() === user.email.toLowerCase()
        );

        setOrders(userOrders);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setLoading(false);
      });
  }, []);

  // Redirect if no user is logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <main className="container profile-page">
      <h1>My Profile</h1>

      <div className="profile-card">
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p>
          <strong>Account Type:</strong>{" "}
          {user.is_staff ? "Staff/Admin" : "Customer"}
        </p>
      </div>

      <h2>My Order History</h2>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length > 0 ? (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Furniture Type</th>
                <th>Material</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Submitted</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.furniture_type}</td>
                  <td>{order.material}</td>
                  <td>
                    <span className={`status-badge status-${order.status.toLowerCase().replaceAll(" ", "-")}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <span className={`priority-badge priority-${order.priority.toLowerCase()}`}>
                      {order.priority}
                    </span>
                  </td>
                  <td>{new Date(order.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No orders found for your account email.</p>
      )}

      <Link className="button-link" to="/products">
        Browse Products
      </Link>
    </main>
  );
}

export default Profile;