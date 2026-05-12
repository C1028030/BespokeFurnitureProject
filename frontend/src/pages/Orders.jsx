import { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";

function Orders() {
  // Gets logged-in user from localStorage
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // Stores all orders from Django API
  const [orders, setOrders] = useState([]);

  // Loading state while orders are being fetched
  const [loading, setLoading] = useState(true);

  // Filter/search values
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  useEffect(() => {
    // Gets all customer orders from Django API
    fetch("http://127.0.0.1:8000/api/orders/")
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setLoading(false);
      });
  }, []);

  // Redirects non-logged-in users to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Stops normal customers from seeing staff order management
  if (!user.is_staff) {
    return (
      <main className="container">
        <h1>Access Denied</h1>
        <p>You do not have permission to view this page.</p>
      </main>
    );
  }

  // Creates dropdown values from order data
  const statuses = [...new Set(orders.map((order) => order.status))];
  const priorities = [...new Set(orders.map((order) => order.priority))];

  // Filters orders based on search/status/priority
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      order.email.toLowerCase().includes(search.toLowerCase()) ||
      order.furniture_type.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = status ? order.status === status : true;

    const matchesPriority = priority ? order.priority === priority : true;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <main className="container">
      <h1>Custom Furniture Orders</h1>
      <p>Manage customer bespoke furniture orders.</p>

      <a
        className="button-link"
        href="http://127.0.0.1:8000/export-orders-csv/"
        >
        Export Orders CSV
        </a>

      <form className="filter-form">
        <p>
          <label>Search orders:</label>
          <input
            type="text"
            placeholder="Customer, email, or furniture type"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </p>

        <p>
          <label>Filter by status:</label>
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            <option value="">All Statuses</option>
            {statuses.map((stat) => (
              <option key={stat} value={stat}>
                {stat}
              </option>
            ))}
          </select>
        </p>

        <p>
          <label>Filter by priority:</label>
          <select
            value={priority}
            onChange={(event) => setPriority(event.target.value)}
          >
            <option value="">All Priorities</option>
            {priorities.map((pri) => (
              <option key={pri} value={pri}>
                {pri}
              </option>
            ))}
          </select>
        </p>
      </form>

      {loading ? (
        <p>Loading orders...</p>
      ) : filteredOrders.length > 0 ? (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Email</th>
                <th>Furniture Type</th>
                <th>Material</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Submitted</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className={order.priority === "Urgent" ? "urgent-row" : ""}
                >
                  <td>#{order.id}</td>
                  <td>{order.customer_name}</td>
                  <td>{order.email}</td>
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
                  <td>
                    <Link to={`/orders/${order.id}`}>View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No orders match your search or filters.</p>
      )}
    </main>
  );
}

export default Orders;