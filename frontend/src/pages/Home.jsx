import { Link } from "react-router-dom"; // React Router link component avoids full page reloads

function Home() {
  return (
    <main className="container">
      {/* Main homepage hero section */}
      <section className="modern-hero">
        <div className="hero-content">
          <p className="eyebrow">Bespoke Furniture</p>

          <h1>Custom furniture orders, tracking, and planning in one place.</h1>

          <p className="hero-description">
            Browse furniture products, create bespoke orders, upload design
            files, and track order progress through a simple online system.
          </p>

          <div className="hero-actions">
            <Link className="button-link" to="/create">
              Create Custom Order
            </Link>

            <Link className="button-link secondary" to="/products">
              View Products
            </Link>
          </div>
        </div>
      </section>

      {/* Quick links for customers */}
      <section className="quick-actions">
        <h2>Quick Actions</h2>

        <div className="action-grid">
          <Link className="action-card" to="/track-order">
            <h3>Track Order</h3>
            <p>Check the progress of an existing order.</p>
          </Link>

          <Link className="action-card" to="/products">
            <h3>Product Catalogue</h3>
            <p>Browse available furniture products.</p>
          </Link>

          <Link className="action-card" to="/profile">
            <h3>My Profile</h3>
            <p>View your account details and order history.</p>
          </Link>
        </div>
      </section>

      {/* Informational cards */}
      <section className="feature-section">
        <h2>System Features</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>Custom Orders</h3>
            <p>
              Customers can submit furniture requests with dimensions, material
              preferences, and uploaded design files.
            </p>
          </div>

          <div className="feature-card">
            <h3>Product Catalogue</h3>
            <p>
              Products can be browsed using a modern catalogue with search and
              filtering options.
            </p>
          </div>

          <div className="feature-card">
            <h3>Order Management</h3>
            <p>
              Staff can manage orders, update statuses, prioritise work, and
              organise production.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;