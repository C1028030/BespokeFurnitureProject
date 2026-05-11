import { useState } from "react";

function CreateOrder() {
  // Stores form values
  const [formData, setFormData] = useState({
    customer_name: "",
    email: "",
    furniture_type: "",
    dimensions: "",
    material: "",
    requirements: "",
  });

  // Stores uploaded design/sketch file
  const [designFile, setDesignFile] = useState(null);

  // Success/error message
  const [message, setMessage] = useState("");

  // Handles normal text input changes
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // Handles form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // FormData is needed because this form includes a file upload
    const submitData = new FormData();

    submitData.append("customer_name", formData.customer_name);
    submitData.append("email", formData.email);
    submitData.append("furniture_type", formData.furniture_type);
    submitData.append("dimensions", formData.dimensions);
    submitData.append("material", formData.material);
    submitData.append("requirements", formData.requirements);

    // Only add file if customer selected one
    if (designFile) {
      submitData.append("design_file", designFile);
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/orders/", {
        method: "POST",

        // Do NOT add Content-Type manually when using FormData
        // Browser sets multipart/form-data automatically
        body: submitData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`Order submitted successfully. Reference number: #${data.id}`);

        // Clears the form after successful submission
        setFormData({
          customer_name: "",
          email: "",
          furniture_type: "",
          dimensions: "",
          material: "",
          requirements: "",
        });

        setDesignFile(null);
      } else {
        setMessage("Order submission failed. Please check the form.");
        console.log(data);
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong while submitting the order.");
    }
  };

  return (
    <main className="container">
      <h1>Create Custom Furniture Order</h1>

      <p>
        Submit your bespoke furniture request with dimensions, material choice,
        requirements, and an optional design file.
      </p>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <p>
          <label>Customer Name:</label>
          <input
            type="text"
            name="customer_name"
            value={formData.customer_name}
            onChange={handleChange}
            required
          />
        </p>

        <p>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </p>

        <p>
          <label>Furniture Type:</label>
          <input
            type="text"
            name="furniture_type"
            value={formData.furniture_type}
            onChange={handleChange}
            required
          />
        </p>

        <p>
          <label>Dimensions:</label>
          <input
            type="text"
            name="dimensions"
            value={formData.dimensions}
            onChange={handleChange}
            placeholder="Example: 180x90x75 cm"
            required
          />
        </p>

        <p>
          <label>Material:</label>
          <input
            type="text"
            name="material"
            value={formData.material}
            onChange={handleChange}
            required
          />
        </p>

        <p>
          <label>Requirements:</label>
          <textarea
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            required
          />
        </p>

        <p>
          <label>Upload Design/Sketch:</label>
          <input
            type="file"
            onChange={(event) => setDesignFile(event.target.files[0])}
          />
        </p>

        <button type="submit">Submit Order</button>

        {message && <p className="form-message">{message}</p>}
      </form>
    </main>
  );
}

export default CreateOrder;