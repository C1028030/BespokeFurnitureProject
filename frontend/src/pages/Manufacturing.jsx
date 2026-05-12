import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function Manufacturing() {
  // Gets logged-in user from localStorage
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // Stores active manufacturing orders
  const [orders, setOrders] = useState([]);

  // Tracks loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetches all orders from Django API
    fetch("http://127.0.0.1:8000/api/orders/")
      .then((response) => response.json())
      .then((data) => {
        // Only keeps orders that still need manufacturing work
        const activeOrders = data.filter(
          (order) => order.status !== "Completed"
        );

        setOrders(activeOrders);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching manufacturing orders:", error);
        setLoading(false);
      });
  }, []);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!user.is_staff) {
    return (
      <main className="container">
        <h1>Access Denied</h1>
        <p>You do not have permission to view this page.</p>
      </main>
    );
  }

  return (
    <main className="container">
      <h1>Manufacturing List</h1>
      <p>Active custom furniture orders that still need to be produced.</p>

      {loading ? (
        <p>Loading manufacturing orders...</p>
      ) : orders.length > 0 ? (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Furniture Type</th>
                <th>Material</th>
                <th>Dimensions</th>
                <th>Status</th>
                <th>Priority</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className={order.priority === "Urgent" ? "urgent-row" : ""}
                >
                  <td>#{order.id}</td>
                  <td>{order.customer_name}</td>
                  <td>{order.furniture_type}</td>
                  <td>{order.material}</td>
                  <td>{order.dimensions}</td>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No active manufacturing orders.</p>
      )}
    </main>
  );
}

export default Manufacturing;