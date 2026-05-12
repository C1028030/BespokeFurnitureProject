import { useEffect, useState } from "react";
import {
  Link,
  Navigate,
  useNavigate,
  useParams,
} from "react-router-dom";

function OrderDetail() {
  // Gets order ID from URL
  const { orderId } = useParams();

  // Used to redirect after deleting
  const navigate = useNavigate();

  // Gets logged-in user from localStorage
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // Stores selected order
  const [order, setOrder] = useState(null);

  // Loading state while fetching order
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetches all orders, then finds selected order
    fetch("http://127.0.0.1:8000/api/orders/")
      .then((response) => response.json())
      .then((data) => {
        const selectedOrder = data.find(
          (item) => item.id === Number(orderId)
        );

        setOrder(selectedOrder);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching order:", error);
        setLoading(false);
      });
  }, [orderId]);

  // Deletes selected order
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (!confirmDelete) {
      return;
    }

    const response = await fetch(
      `http://127.0.0.1:8000/api/orders/${order.id}/`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      // Redirects back to orders page
      navigate("/orders");
    } else {
      alert("Failed to delete order.");
    }
  };

  // Redirects guests to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Stops customers accessing staff order pages
  if (!user.is_staff) {
    return (
      <main className="container">
        <h1>Access Denied</h1>
        <p>You do not have permission to view this page.</p>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="container">
        <p>Loading order...</p>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="container">
        <h1>Order Not Found</h1>
        <p>This order could not be found.</p>
      </main>
    );
  }

  // Creates CSS-friendly class names
  const statusClass = order.status
    .toLowerCase()
    .replaceAll(" ", "-");

  const priorityClass = order.priority.toLowerCase();

  return (
    <main className="container">
      <h1>Order Details</h1>

      <div className="profile-card">
        <p><strong>Order ID:</strong> #{order.id}</p>

        <p><strong>Customer:</strong> {order.customer_name}</p>

        <p><strong>Email:</strong> {order.email}</p>

        <p><strong>Furniture Type:</strong> {order.furniture_type}</p>

        <p><strong>Dimensions:</strong> {order.dimensions}</p>

        <p><strong>Material:</strong> {order.material}</p>

        <p><strong>Requirements:</strong> {order.requirements}</p>

        <p>
          <strong>Status:</strong>{" "}
          <span className={`status-badge status-${statusClass}`}>
            {order.status}
          </span>
        </p>

        <p>
          <strong>Priority:</strong>{" "}
          <span className={`priority-badge priority-${priorityClass}`}>
            {order.priority}
          </span>
        </p>

        <p>
          <strong>Submitted:</strong>{" "}
          {new Date(order.created_at).toLocaleString()}
        </p>

        {order.design_file ? (
          <p>
            <strong>Uploaded Design:</strong>{" "}
            <a
              href={`http://127.0.0.1:8000${order.design_file}`}
              target="_blank"
              rel="noreferrer"
            >
              View Design File
            </a>
          </p>
        ) : (
          <p>
            <strong>Uploaded Design:</strong> No design file uploaded.
          </p>
        )}
      </div>

      {/* Order progress timeline */}
      <section>
        <h2>Order Progress</h2>

        <div className="timeline">
          {[
            "Pending",
            "In Review",
            "Approved",
            "In Production",
            "Ready for Delivery",
            "Completed",
          ].map((step, index, steps) => {
            const currentIndex = steps.indexOf(order.status);

            let state = "upcoming";

            if (index < currentIndex) {
              state = "completed";
            } else if (index === currentIndex) {
              state = "active";
            }

            return (
              <div className={`timeline-step ${state}`} key={step}>
                {/* Numbered timeline circle */}
                <div className="timeline-circle">
                  {index + 1}
                </div>

                {/* Timeline label */}
                <p>{step}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Action buttons */}
      <div className="hero-actions">
        <Link className="button-link secondary" to="/orders">
          Back to Orders
        </Link>

        <Link
          className="button-link"
          to={`/orders/${order.id}/edit`}
        >
          Edit Order
        </Link>

        <a
          className="button-link"
          href={`http://127.0.0.1:8000/export-order-pdf/${order.id}/`}
        >
          Download PDF
        </a>

        <button
          className="button-link danger"
          onClick={handleDelete}
        >
          Delete Order
        </button>
      </div>
    </main>
  );
}

export default OrderDetail;