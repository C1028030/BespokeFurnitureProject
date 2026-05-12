import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function DeliveryPlanning() {
  // Gets logged-in user from localStorage
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // Stores grouped delivery orders
  const [groupedOrders, setGroupedOrders] = useState({});

  // Tracks loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Gets all orders from Django API
    fetch("http://127.0.0.1:8000/api/orders/")
      .then((response) => response.json())
      .then((data) => {
        // Only orders currently relevant for delivery planning
        const deliveryOrders = data.filter(
          (order) =>
            order.status === "In Production" ||
            order.status === "Ready for Delivery"
        );

        // Groups orders by material
        const groups = {};

        deliveryOrders.forEach((order) => {
          if (!groups[order.material]) {
            groups[order.material] = [];
          }

          groups[order.material].push(order);
        });

        setGroupedOrders(groups);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching delivery orders:", error);
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
      <h1>Delivery Planning</h1>
      <p>Orders grouped by material to support delivery batching and planning.</p>

      {loading ? (
        <p>Loading delivery planning data...</p>
      ) : Object.keys(groupedOrders).length > 0 ? (
        Object.entries(groupedOrders).map(([material, orders]) => (
          <section key={material}>
            <h2>
              {material} ({orders.length} orders)
            </h2>

            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Furniture Type</th>
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
          </section>
        ))
      ) : (
        <p>No orders are currently ready for delivery planning.</p>
      )}
    </main>
  );
}

export default DeliveryPlanning;