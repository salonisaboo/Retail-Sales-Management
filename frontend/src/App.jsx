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

  const [sortBy, setSortBy] = useState("name_asc"); // matches Figma: Customer Name (A–Z)
  const [page, setPage] = useState(1);

  const [rows, setRows] = useState([]);
  const [metrics, setMetrics] = useState({
    totalUnits: 0,
    totalAmount: 0,
    totalDiscount: 0
  });
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // sidebar “active” states (visual only)
  const [selectedService, setSelectedService] = useState("Active");
  const [selectedInvoice, setSelectedInvoice] = useState("Proforma Invoices");

  const handleFilterChange = (name, value) => {
    setPage(1); // whenever filters change go back to page 1
    setFilters((prev) => ({ ...prev, [name]: value }));
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
      {/* Sidebar (visual only) */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">Vault</div>
          <div className="sidebar-user">Saloni Saboo ▾</div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">Dashboard</div>
          <button className="nav-item">Nexus</button>
          <button className="nav-item">Intake</button>

          <div className="nav-section">Services</div>
          <button
            className={`nav-item ${selectedService === "Pre-active" ? "active" : ""
              }`}
            onClick={() => setSelectedService("Pre-active")}
          >
            Pre-active
          </button>
          <button
            className={`nav-item ${selectedService === "Active" ? "active" : ""
              }`}
            onClick={() => setSelectedService("Active")}
          >
            Active
          </button>
          <button
            className={`nav-item ${selectedService === "Blocked" ? "active" : ""
              }`}
            onClick={() => setSelectedService("Blocked")}
          >
            Blocked
          </button>
          <button
            className={`nav-item ${selectedService === "Closed" ? "active" : ""
              }`}
            onClick={() => setSelectedService("Closed")}
          >
            Closed
          </button>

          <div className="nav-section">Invoices</div>
          <button
            className={`nav-item ${selectedInvoice === "Proforma Invoices" ? "active" : ""
              }`}
            onClick={() => setSelectedInvoice("Proforma Invoices")}
          >
            Proforma Invoices
          </button>
          <button
            className={`nav-item ${selectedInvoice === "Final Invoices" ? "active" : ""
              }`}
            onClick={() => setSelectedInvoice("Final Invoices")}
          >
            Final Invoices
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="main-content">
        {/* Top line: title + search bar (like Figma) */}
        <header className="top-bar">
          <h1>Sales Management System</h1>
          <SearchBar value={search} onChange={setSearch} />
        </header>

        {/* Filters row */}
        <section className="filters-row">
          <div className="filters-bar-wrapper">
            <FiltersBar
              filters={filters}
              onChange={handleFilterChange}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          </div>
        </section>

        {/* Metrics row */}
        <MetricsBar metrics={metrics} />

        {/* Table */}
        <section className="table-section">
          {loading ? (
            <div className="empty-state">Loading...</div>
          ) : rows.length === 0 ? (
            <div className="empty-state">No results found</div>
          ) : (
            <TransactionsTable rows={rows} />
          )}
        </section>

        {/* Pagination controls */}
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
