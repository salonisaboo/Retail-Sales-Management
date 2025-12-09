export default function MetricsBar({ metrics }) {
    const totalUnits = metrics?.totalUnits || 0;
    const totalAmount = metrics?.totalAmount || 0;
    const totalDiscount = metrics?.totalDiscount || 0;

    return (
        <div className="metrics-bar">
            <div className="metric-card">
                <div className="metric-title">Total units sold</div>
                <div className="metric-value">{totalUnits}</div>
            </div>

            <div className="metric-card">
                <div className="metric-title">Total Amount</div>
                <div className="metric-value">
                    ₹{Number(totalAmount).toLocaleString("en-IN")}
                </div>
            </div>

            <div className="metric-card">
                <div className="metric-title">Total Discount</div>
                <div className="metric-value">{totalDiscount}</div>
            </div>
        </div>
    );
}
