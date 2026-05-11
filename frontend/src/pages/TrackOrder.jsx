import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function TrackOrder() {
  // Gets logged-in user details from localStorage
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // Stores all orders linked to the logged-in user
  const [orders, setOrders] = useState([]);

  // Stores loading state while fetching data
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If user is not logged in, do not fetch orders
    if (!user) {
      setLoading(false);
      return;
    }

    // Gets orders from Django API
    fetch("http://127.0.0.1:8000/api/orders/")
      .then((response) => response.json())
      .then((data) => {
        // Only show orders matching the logged-in user's email
        const matchingOrders = data.filter(
          (order) =>
            order.email.toLowerCase() === user.email.toLowerCase()
        );

        setOrders(matchingOrders);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setLoading(false);
      });
  }, []);

  // Redirect guests to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <main className="container">
      <h1>Track Orders</h1>
      <p>Your submitted furniture orders are shown below.</p>

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
                    <span
                      className={`status-badge status-${order.status
                        .toLowerCase()
                        .replaceAll(" ", "-")}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`priority-badge priority-${order.priority.toLowerCase()}`}
                    >
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
        <p>No orders found for your account.</p>
      )}
    </main>
  );
}

export default TrackOrder;