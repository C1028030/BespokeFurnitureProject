import { useEffect, useState } from "react"; // React hook for running code on page load and when dependencies change

function Products() {
  // Stores products from Django API
  const [products, setProducts] = useState([]);

  // Stores loading state while API request is running
  const [loading, setLoading] = useState(true);

  // Stores search/filter values
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [material, setMaterial] = useState("");

  // Runs once when the page loads
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products/")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  // Creates category dropdown values from product data
  const categories = [...new Set(products.map((product) => product.category))];

  // Creates material dropdown values from product data
  const materials = [...new Set(products.map((product) => product.material))];

  // Filters products on the frontend
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory = category ? product.category === category : true;

    const matchesMaterial = material ? product.material === material : true;

    return matchesSearch && matchesCategory && matchesMaterial;
  });

  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <main className="container">
      <h1>Furniture Products</h1>
      <p>Browse available bespoke furniture products below.</p>

      <form className="filter-form">
        <p>
          <label>Search by name:</label>
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </p>

        <p>
          <label>Filter by category:</label>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </p>

        <p>
          <label>Filter by material:</label>
          <select
            value={material}
            onChange={(event) => setMaterial(event.target.value)}
          >
            <option value="">All Materials</option>
            {materials.map((mat) => (
              <option key={mat} value={mat}>
                {mat}
              </option>
            ))}
          </select>
        </p>
      </form>

      {filteredProducts.length > 0 ? (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              {product.image ? (
                <img
                  src={`http://127.0.0.1:8000${product.image}`}
                  alt={product.name}
                />
              ) : (
                <div className="product-placeholder">No Image</div>
              )}

              <div className="product-card-content">
                <p className="product-category">{product.category}</p>
                <h2>{product.name}</h2>
                <p>
                  <strong>Material:</strong> {product.material}
                </p>
                <p className="product-description">{product.description}</p>
                <p className="product-price">£{product.price}</p>

                <a className="button-link" href={`/products/${product.id}`}>
                  View Details
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No furniture products match your search or filters.</p>
      )}
    </main>
  );
}

export default Products;