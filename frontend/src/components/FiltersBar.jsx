import { useState, useEffect } from "react";

const regions = ["North", "South", "East", "West"];
const genders = ["Male", "Female"];
const categories = ["Clothing", "Electronics", "Beauty", "Accessories"];
const payments = ["UPI", "Cash", "Debit Card", "Credit Card"];
const tagOptions = ["fragrance", "gift", "skincare", "organic", "electronics"];

// Generic multi-select dropdown with checkboxes
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

export default function FiltersBar({ filters, onChange, sortBy, setSortBy }) {
    return (
        <div className="filters-bar">
            <MultiSelectDropdown
                label="Customer Region"
                options={regions}
                values={filters.region}
                onChange={(vals) => onChange("region", vals)}
                width={150}
            />

            <MultiSelectDropdown
                label="Gender"
                options={genders}
                values={filters.gender}
                onChange={(vals) => onChange("gender", vals)}
                width={120}
            />

            <div className="filter-group age-group">
                <div className="filter-label">Age Range</div>
                <div className="age-range">
                    <input
                        type="number"
                        placeholder="Min"
                        value={filters.minAge}
                        onChange={(e) => onChange("minAge", e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Max"
                        value={filters.maxAge}
                        onChange={(e) => onChange("maxAge", e.target.value)}
                    />
                </div>
            </div>

            <MultiSelectDropdown
                label="Product Category"
                options={categories}
                values={filters.category}
                onChange={(vals) => onChange("category", vals)}
                width={180}
            />

            <MultiSelectDropdown
                label="Tags"
                options={tagOptions}
                values={filters.tags}
                onChange={(vals) => onChange("tags", vals)}
                width={160}
            />

            <MultiSelectDropdown
                label="Payment Method"
                options={payments}
                values={filters.paymentMethod}
                onChange={(vals) => onChange("paymentMethod", vals)}
                width={180}
            />

            <div className="filter-group date-group">
                <div className="filter-label">Date Range</div>
                <div className="date-range">
                    <input
                        type="date"
                        value={filters.startDate}
                        onChange={(e) => onChange("startDate", e.target.value)}
                    />
                    <input
                        type="date"
                        value={filters.endDate}
                        onChange={(e) => onChange("endDate", e.target.value)}
                    />
                </div>
            </div>

            <select
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
            >
                <option value="name_asc">Sort by: Customer Name (A–Z)</option>
                <option value="date_desc">Sort by: Date (Newest First)</option>
                <option value="qty_desc">Sort by: Quantity</option>
            </select>
        </div>
    );
}
