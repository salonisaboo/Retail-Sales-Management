import { useState, useEffect } from "react";

const regions = ["North", "South", "East", "West"];
const genders = ["Male", "Female"];
const categories = ["Clothing", "Electronics", "Beauty", "Accessories"];
const payments = ["UPI", "Cash", "Debit Card", "Credit Card"];
const tagOptions = ["fragrance", "gift", "skincare", "organic", "electronics"];

// Age & Date dropdown presets
const ageRangeOptions = [
    { label: "Age Range", value: "" }, // placeholder
    { label: "18 – 25", value: "18-25" },
    { label: "26 – 35", value: "26-35" },
    { label: "36 – 45", value: "36-45" },
    { label: "46 – 60", value: "46-60" },
    { label: "60+", value: "60-120" }
];

const dateOptions = [
    { label: "Date", value: "" }, // placeholder
    { label: "Last 7 days", value: "last7" },
    { label: "Last 30 days", value: "last30" },
    { label: "Last 6 months", value: "last180" },
    { label: "Last 1 year", value: "last365" }
];

// Multi-select pill dropdown
function MultiSelectDropdown({ label, options, values, onChange, width }) {
    const [open, setOpen] = useState(false);

    const toggleOption = (value) => {
        if (values.includes(value)) {
            onChange(values.filter((v) => v !== value));
        } else {
            onChange([...values, value]);
        }
    };

    useEffect(() => {
        const close = () => setOpen(false);
        window.addEventListener("click", close);
        return () => window.removeEventListener("click", close);
    }, []);

    return (
        <div
            className="multi-select"
            style={{ width }}
            onClick={(e) => e.stopPropagation()}
        >
            <button
                type="button"
                className="multi-select-trigger"
                onClick={() => setOpen((o) => !o)}
            >
                <span className={values.length ? "ms-label-selected" : "ms-label"}>
                    {values.length ? values.join(", ") : label}
                </span>
                <span className="ms-chevron">▾</span>
            </button>

            {open && (
                <div className="multi-select-menu">
                    {options.map((opt) => (
                        <label key={opt} className="multi-select-option">
                            <input
                                type="checkbox"
                                checked={values.includes(opt)}
                                onChange={() => toggleOption(opt)}
                            />
                            <span>{opt}</span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
}

// Simple single-select pill dropdown (for Age Range & Date)
function SimpleDropdown({ label, value, onChange, options, width }) {
    return (
        <select
            className="simple-select"
            value={value}
            onChange={onChange}
            style={{ width }}
        >
            <option value="">{label}</option>
            {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
            ))}
        </select>
    );
}

export default function FiltersBar({ filters, onChange, sortBy, setSortBy }) {
    // Local selection keys for age & date, so App state stays simple
    const [ageKey, setAgeKey] = useState("");
    const [dateKey, setDateKey] = useState("");

    const handleAgeChange = (e) => {
        const val = e.target.value;
        setAgeKey(val);

        if (!val) {
            onChange("minAge", "");
            onChange("maxAge", "");
            return;
        }
        const [min, max] = val.split("-");
        onChange("minAge", min);
        onChange("maxAge", max);
    };

    const handleDateChange = (e) => {
        const val = e.target.value;
        setDateKey(val);

        if (!val) {
            onChange("startDate", "");
            onChange("endDate", "");
            return;
        }

        const today = new Date();
        const end = today.toISOString().slice(0, 10);

        let days = 0;
        if (val === "last7") days = 7;
        else if (val === "last30") days = 30;
        else if (val === "last180") days = 180;
        else if (val === "last365") days = 365;

        const startDateObj = new Date(today.getTime() - days * 24 * 60 * 60 * 1000);
        const start = startDateObj.toISOString().slice(0, 10);

        onChange("startDate", start);
        onChange("endDate", end);
    };

    return (
        <div className="filters-bar">
            {/* Customer Region */}
            <MultiSelectDropdown
                label="Customer Region"
                options={regions}
                values={filters.region}
                onChange={(vals) => onChange("region", vals)}
                width={145}
            />

            {/* Gender */}
            <MultiSelectDropdown
                label="Gender"
                options={genders}
                values={filters.gender}
                onChange={(vals) => onChange("gender", vals)}
                width={95}
            />

            {/* Age Range dropdown */}
            <SimpleDropdown
                label="Age Range"
                value={ageKey}
                onChange={handleAgeChange}
                options={ageRangeOptions.slice(1)}
                width={120}
            />

            {/* Product Category */}
            <MultiSelectDropdown
                label="Product Category"
                options={categories}
                values={filters.category}
                onChange={(vals) => onChange("category", vals)}
                width={155}
            />

            {/* Tags */}
            <MultiSelectDropdown
                label="Tags"
                options={tagOptions}
                values={filters.tags}
                onChange={(vals) => onChange("tags", vals)}
                width={85}
            />

            {/* Payment Method */}
            <MultiSelectDropdown
                label="Payment Method"
                options={payments}
                values={filters.paymentMethod}
                onChange={(vals) => onChange("paymentMethod", vals)}
                width={155}
            />

            {/* Date dropdown */}
            <SimpleDropdown
                label="Date"
                value={dateKey}
                onChange={handleDateChange}
                options={dateOptions.slice(1)}
                width={110}
            />

            {/* Sort dropdown – same line */}
            <select
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{ width: 215 }}
            >
                <option value="name_asc">Sort by: Customer Name (A–Z)</option>
                <option value="date_desc">Sort by: Date (Newest First)</option>
                <option value="qty_desc">Sort by: Quantity</option>
            </select>
        </div>
    );
}
