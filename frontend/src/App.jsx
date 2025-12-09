import { useEffect, useState } from "react";
import { fetchSales } from "./services/salesApi";
import SearchBar from "./components/SearchBar";
import FiltersBar from "./components/FiltersBar";
import MetricsBar from "./components/MetricsBar";
import TransactionsTable from "./components/TransactionsTable";
import Pagination from "./components/Pagination";

function App() {
  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState({
    region: [],
    gender: [],
    category: [],
    paymentMethod: [],
    tags: [],
    minAge: "",
    maxAge: "",
    startDate: "",
    endDate: ""
  });

  const [sortBy, setSortBy] = useState("name_asc");
  const [page, setPage] = useState(1);

  const [rows, setRows] = useState([]);
  const [metrics, setMetrics] = useState({
    totalUnits: 0,
    totalAmount: 0,
    totalDiscount: 0
  });
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [selectedService, setSelectedService] = useState("Active");
  const [selectedInvoice, setSelectedInvoice] = useState("Proforma Invoices");

  const handleFilterChange = (name, value) => {
    setPage(1);
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleResetAll = () => {
    setSearch("");
    setSortBy("name_asc");
    setPage(1);
    setFilters({
      region: [],
      gender: [],
      category: [],
      paymentMethod: [],
      tags: [],
      minAge: "",
      maxAge: "",
      startDate: "",
      endDate: ""
    });
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchSales({
          search,
          region: filters.region.join(","),
          gender: filters.gender.join(","),
          category: filters.category.join(","),
          paymentMethod: filters.paymentMethod.join(","),
          tags: filters.tags.join(","),
          minAge: filters.minAge,
          maxAge: filters.maxAge,
          startDate: filters.startDate,
          endDate: filters.endDate,
          sortBy,
          page,
          limit: 10
        });

        if (data.success) {
          setRows(data.data || []);
          setMetrics(
            data.metrics || {
              totalUnits: 0,
              totalAmount: 0,
              totalDiscount: 0
            }
          );
          setTotalPages(data.totalPages || 1);
        }
      } catch (err) {
        console.error("Error fetching sales:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [search, filters, sortBy, page]);

  return (
    <div className="app-root">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo-wrap">
            {/* logo.jpg must be in public/ */}
            <img src="/logo.jpg" alt="Vault logo" className="sidebar-logo-img" />
            <span className="sidebar-logo-text">Vault</span>
          </div>
          <div className="sidebar-user">Anurag Yadav ▾</div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">DASHBOARD</div>
          <button className="nav-item">Nexus</button>
          <button className="nav-item">Intake</button>

          <div className="nav-section">SERVICES</div>
          <button
            className={`nav-item ${selectedService === "Pre-active" ? "active" : ""}`}
            onClick={() => setSelectedService("Pre-active")}
          >
            Pre-active
          </button>
          <button
            className={`nav-item ${selectedService === "Active" ? "active" : ""}`}
            onClick={() => setSelectedService("Active")}
          >
            Active
          </button>
          <button
            className={`nav-item ${selectedService === "Blocked" ? "active" : ""}`}
            onClick={() => setSelectedService("Blocked")}
          >
            Blocked
          </button>
          <button
            className={`nav-item ${selectedService === "Closed" ? "active" : ""}`}
            onClick={() => setSelectedService("Closed")}
          >
            Closed
          </button>

          <div className="nav-section">INVOICES</div>
          <button
            className={`nav-item ${selectedInvoice === "Proforma Invoices" ? "active" : ""}`}
            onClick={() => setSelectedInvoice("Proforma Invoices")}
          >
            Proforma Invoices
          </button>
          <button
            className={`nav-item ${selectedInvoice === "Final Invoices" ? "active" : ""}`}
            onClick={() => setSelectedInvoice("Final Invoices")}
          >
            Final Invoices
          </button>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <h1 className="title-header">Sales Management System</h1>

        <div className="top-bar">
          <SearchBar value={search} onChange={setSearch} />
        </div>

        <FiltersBar
          filters={filters}
          onChange={handleFilterChange}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onResetAll={handleResetAll}
        />

        <MetricsBar metrics={metrics} />

        <section className="table-section">
          {loading ? (
            <div className="empty-state">Loading...</div>
          ) : rows.length === 0 ? (
            <div className="empty-state">No results found</div>
          ) : (
            <TransactionsTable rows={rows} />
          )}
        </section>

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </main>
    </div>
  );
}

export default App;