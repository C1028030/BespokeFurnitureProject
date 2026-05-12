import { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function Dashboard() {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/analytics/")
      .then((response) => response.json())
      .then((data) => {
        setAnalytics(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching analytics:", error);
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
        <p>You do not have permission to view this dashboard.</p>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="container">
        <p>Loading dashboard...</p>
      </main>
    );
  }

  const statusChartData = {
    labels: analytics.status_labels,
    datasets: [
      {
        label: "Number of Orders",
        data: analytics.status_counts,
      },
    ],
  };

  const dailyChartData = {
    labels: analytics.daily_order_labels,
    datasets: [
      {
        label: "Orders Submitted",
        data: analytics.daily_order_counts,
        tension: 0.3,
      },
    ],
  };

  return (
    <main className="container">
      <h1>Staff Dashboard</h1>
      <p>Overview of orders, products, and business activity.</p>

      <section className="dashboard-stats">
        <Link className="stat-card" to="/orders">
          <h2>{analytics.total_orders}</h2>
          <p>Total Orders</p>
        </Link>

        <Link className="stat-card" to="/orders">
          <h2>{analytics.pending_orders}</h2>
          <p>Pending Orders</p>
        </Link>

        <Link className="stat-card" to="/orders">
          <h2>{analytics.completed_orders}</h2>
          <p>Completed Orders</p>
        </Link>

        <Link className="stat-card" to="/products">
          <h2>{analytics.total_products}</h2>
          <p>Products Available</p>
        </Link>
      </section>

      <section className="analytics-section">
        <h2>Orders by Status</h2>
        <Bar data={statusChartData} />
      </section>

      <section className="analytics-section">
        <h2>Orders Over Time</h2>
        <Line data={dailyChartData} />
      </section>
    </main>
  );
}

export default Dashboard;