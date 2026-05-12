import { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";

function CustomerHistory() {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [orders, setOrders] = useState([]);
  const [email, setEmail] = useState("");
  const [searchedEmail, setSearchedEmail] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Gets all orders from Django API
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

  const handleSearch = (event) => {
    event.preventDefault();

    // Finds orders matching the searched customer email
    const matchingOrders = orders.filter(
      (order) => order.email.toLowerCase() === email.toLowerCase()
    );

    setResults(matchingOrders);
    setSearchedEmail(email);
  };

  return (
    <main className="container">
      <h1>Customer Order History</h1>
      <p>Search by customer email to view previous custom furniture orders.</p>

      <form onSubmit={handleSearch}>
        <p>
          <label>Customer Email:</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </p>

        <button type="submit">Search History</button>
      </form>

      {loading ? (
        <p>Loading orders...</p>
      ) : searchedEmail && results.length > 0 ? (
        <>
          <h2>Orders for {searchedEmail}</h2>

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
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {results.map((order) => (
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
                    <td>
                      <Link to={`/orders/${order.id}`}>View</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : searchedEmail ? (
        <p>No order history found for {searchedEmail}.</p>
      ) : null}
    </main>
  );
}

export default CustomerHistory;