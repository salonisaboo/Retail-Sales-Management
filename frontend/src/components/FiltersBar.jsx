import { useState, useEffect, useRef } from "react";

const REGION_OPTIONS = ["North", "South", "East", "West", "Central"];
const GENDER_OPTIONS = ["Male", "Female"];
const CATEGORY_OPTIONS = ["Clothing", "Electronics", "Beauty", "Home", "Sports"];
const TAG_OPTIONS = ["fragrance", "gift", "skincare", "wireless", "fashion"];
const PAYMENT_OPTIONS = ["UPI", "Cash", "Debit Card", "Credit Card", "Wallet"];

const AGE_RANGE_OPTIONS = [
    { label: "18–25", value: "18-25" },
    { label: "26–35", value: "26-35" },
    { label: "36–45", value: "36-45" },
    { label: "46–60", value: "46-60" },
    { label: "60+", value: "60-120" }
];

const DATE_OPTIONS = [
    { label: "Today", value: "today" },
    { label: "Last 7 days", value: "last7" },
    { label: "Last 30 days", value: "last30" },
    { label: "Last 6 months", value: "last180" },
    { label: "Last 1 year", value: "last365" }
];

// Multi-select dropdown for region / gender / category / tags / payment
function MultiSelectDropdown({ label, options, values = [], onChange, minWidth }) {
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef(null);

    const toggleOption = (value) => {
        if (values.includes(value)) {
            onChange(values.filter((v) => v !== value));
        } else {
            onChange([...values, value]);
        }
    };

    const handleTriggerClick = () => {
        setOpen((o) => !o);
    };

    // Click outside to close
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const displayText =
        values.length > 0
            ? values.length === 1
                ? values[0]
                : `${values[0]} +${values.length - 1}`
            : label;

    return (
        <div className="multi-select" style={{ minWidth }} ref={wrapperRef}>
            <button
                type="button"
                className="filter-box-trigger"
                onClick={handleTriggerClick}
            >
                <span className={values.length ? "ms-label-selected" : "ms-label"}>
                    {displayText}
                </span>
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

function SingleSelectDropdown({ label, value, onChange, options, minWidth }) {
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectedLabel = options.find(opt => opt.value === value)?.label || label;

    return (
        <div className="multi-select" style={{ minWidth }} ref={wrapperRef}>
            <button
                type="button"
                className="filter-box-trigger"
                onClick={() => setOpen(o => !o)}
            >
                <span className={value ? "ms-label-selected" : "ms-label"}>{selectedLabel}</span>
            </button>
            {open && (
                <div className="multi-select-menu">
                    <label className="multi-select-option" style={{ fontWeight: value ? 500 : 400 }}>
                        <input type="radio" checked={!value} onChange={() => onChange("")} />
                        <span>{label}</span>
                    </label>
                    {options.map(opt => (
                        <label key={opt.value} className="multi-select-option">
                            <input
                                type="radio"
                                checked={value === opt.value}
                                onChange={() => onChange(opt.value)}
                            />
                            <span>{opt.label}</span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
}

export default function FiltersBar({
    filters,
    onChange,
    sortBy,
    setSortBy,
    onResetAll
}) {
    const [ageKey, setAgeKey] = useState("");
    const [dateKey, setDateKey] = useState("");

    const handleAgeChange = (val) => {
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

    const handleDateChange = (val) => {
        setDateKey(val);
        if (!val) {
            onChange("startDate", "");
            onChange("endDate", "");
            return;
        }

        const today = new Date();
        const end = today.toISOString().slice(0, 10);

        let days = 0;
        if (val === "today") days = 0;
        else if (val === "last7") days = 7;
        else if (val === "last30") days = 30;
        else if (val === "last180") days = 180;
        else if (val === "last365") days = 365;

        const startDateObj = new Date(today.getTime() - days * 24 * 60 * 60 * 1000);
        const start = startDateObj.toISOString().slice(0, 10);

        onChange("startDate", start);
        onChange("endDate", end);
    };

    const handleReset = () => {
        setAgeKey("");
        setDateKey("");

        onChange("region", []);
        onChange("gender", []);
        onChange("category", []);
        onChange("tags", []);
        onChange("paymentMethod", []);
        onChange("minAge", "");
        onChange("maxAge", "");
        onChange("startDate", "");
        onChange("endDate", "");

        if (onResetAll) onResetAll();
    };

    return (
        <div className="filters-row">
            <button
                type="button"
                className="reset-icon-btn"
                aria-label="Reset filters"
                onClick={handleReset}
                title="Reset all filters"
            >
                ⟳
            </button>

            <div className="filters-bar-wrapper">
                <div className="filters-bar">
                    <MultiSelectDropdown
                        label="Customer Region"
                        options={REGION_OPTIONS}
                        values={filters.region || []}
                        onChange={(vals) => onChange("region", vals)}
                        minWidth={150}
                    />

                    <MultiSelectDropdown
                        label="Gender"
                        options={GENDER_OPTIONS}
                        values={filters.gender || []}
                        onChange={(vals) => onChange("gender", vals)}
                        minWidth={90}
                    />

                    <SingleSelectDropdown
                        label="Age Range"
                        value={ageKey}
                        onChange={handleAgeChange}
                        options={AGE_RANGE_OPTIONS}
                        minWidth={115}
                    />

                    <MultiSelectDropdown
                        label="Product Category"
                        options={CATEGORY_OPTIONS}
                        values={filters.category || []}
                        onChange={(vals) => onChange("category", vals)}
                        minWidth={155}
                    />

                    <MultiSelectDropdown
                        label="Tags"
                        options={TAG_OPTIONS}
                        values={filters.tags || []}
                        onChange={(vals) => onChange("tags", vals)}
                        minWidth={80}
                    />

                    <MultiSelectDropdown
                        label="Payment Method"
                        options={PAYMENT_OPTIONS}
                        values={filters.paymentMethod || []}
                        onChange={(vals) => onChange("paymentMethod", vals)}
                        minWidth={155}
                    />

                    <SingleSelectDropdown
                        label="Date"
                        value={dateKey}
                        onChange={handleDateChange}
                        options={DATE_OPTIONS}
                        minWidth={95}
                    />

                    <SingleSelectDropdown
                        label="Sort by: Customer Name (A–Z)"
                        value={sortBy}
                        onChange={setSortBy}
                        options={[
                            { label: "Sort by: Customer Name (A–Z)", value: "name_asc" },
                            { label: "Sort by: Date (Newest First)", value: "date_desc" },
                            { label: "Sort by: Quantity", value: "qty_desc" }
                        ]}
                        minWidth={220}
                    />
                </div>
            </div>
        </div>
    );
}