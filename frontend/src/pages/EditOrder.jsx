import { useEffect, useState } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";

function EditOrder() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [formData, setFormData] = useState({
    customer_name: "",
    email: "",
    furniture_type: "",
    dimensions: "",
    material: "",
    requirements: "",
    status: "",
    priority: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/orders/${orderId}/`)
      .then((response) => response.json())
      .then((data) => {
        setFormData({
          customer_name: data.customer_name || "",
          email: data.email || "",
          furniture_type: data.furniture_type || "",
          dimensions: data.dimensions || "",
          material: data.material || "",
          requirements: data.requirements || "",
          status: data.status || "Pending",
          priority: data.priority || "Normal",
        });
      })
      .catch((error) => console.error("Error fetching order:", error));
  }, [orderId]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!user.is_staff) {
    return (
      <main className="container">
        <h1>Access Denied</h1>
        <p>You do not have permission to edit orders.</p>
      </main>
    );
  }

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(`http://127.0.0.1:8000/api/orders/${orderId}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setMessage("Order updated successfully.");

      setTimeout(() => {
        navigate(`/orders/${orderId}`);
      }, 800);
    } else {
      setMessage("Failed to update order.");
    }
  };

  return (
    <main className="container">
      <h1>Edit Order</h1>

      <form onSubmit={handleSubmit}>
        <p>
          <label>Customer Name:</label>
          <input
            name="customer_name"
            value={formData.customer_name}
            onChange={handleChange}
          />
        </p>

        <p>
          <label>Email:</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </p>

        <p>
          <label>Furniture Type:</label>
          <input
            name="furniture_type"
            value={formData.furniture_type}
            onChange={handleChange}
          />
        </p>

        <p>
          <label>Dimensions:</label>
          <input
            name="dimensions"
            value={formData.dimensions}
            onChange={handleChange}
          />
        </p>

        <p>
          <label>Material:</label>
          <input
            name="material"
            value={formData.material}
            onChange={handleChange}
          />
        </p>

        <p>
          <label>Requirements:</label>
          <textarea
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
          />
        </p>

        <p>
          <label>Status:</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="Pending">Pending</option>
            <option value="In Review">In Review</option>
            <option value="Approved">Approved</option>
            <option value="In Production">In Production</option>
            <option value="Ready for Delivery">Ready for Delivery</option>
            <option value="Completed">Completed</option>
          </select>
        </p>

        <p>
          <label>Priority:</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="Low">Low</option>
            <option value="Normal">Normal</option>
            <option value="High">High</option>
            <option value="Urgent">Urgent</option>
          </select>
        </p>

        <button type="submit">Save Changes</button>

        {message && <p className="form-message">{message}</p>}
      </form>
    </main>
  );
}

export default EditOrder;