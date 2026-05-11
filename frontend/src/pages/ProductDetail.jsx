import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function ProductDetail() {
  // Gets product ID from the URL, for example /products/1
  const { productId } = useParams();

  // Stores the selected product from the API
  const [product, setProduct] = useState(null);

  // Tracks loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetches one product from the Django API
    fetch(`http://127.0.0.1:8000/api/products/${productId}/`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setLoading(false);
      });
  }, [productId]);

  if (loading) {
    return (
      <main className="container">
        <p>Loading product...</p>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="container">
        <p>Product not found.</p>
      </main>
    );
  }

  return (
    <main className="container">
      <div className="product-detail-layout">
        <div>
          {product.image ? (
            <img
              className="product-detail-image"
              src={`http://127.0.0.1:8000${product.image}`}
              alt={product.name}
            />
          ) : (
            <div className="product-placeholder">No Image</div>
          )}
        </div>

        <div className="product-detail-content">
          <p className="product-category">{product.category}</p>

          <h1>{product.name}</h1>

          <p>
            <strong>Material:</strong> {product.material}
          </p>

          <p>
            <strong>Price:</strong> £{product.price}
          </p>

          <p>{product.description}</p>

          <div className="hero-actions">
            <Link className="button-link" to="/create">
              Create Custom Order
            </Link>

            <Link className="button-link secondary" to="/products">
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductDetail;