export default function TransactionsTable({ rows }) {

    const handleCopyPhone = (phone) => {
        if (!phone) return;

        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(phone)
                .then(() => console.log("Copied:", phone))
                .catch(() => fallbackCopy(phone));
        } else {
            fallbackCopy(phone);
        }
    };

    const fallbackCopy = (text) => {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
    };

    return (
        <table className="transactions-table">
            <thead>
                <tr>
                    <th>Transaction ID</th>
                    <th>Date</th>
                    <th>Customer ID</th>
                    <th>Customer Name</th>
                    <th>Phone Number</th>
                    <th>Gender</th>
                    <th>Age</th>
                    <th>Product Category</th>
                    <th>Quantity</th>
                    <th>Total Amount</th>
                    <th>Customer Region</th>
                    <th>Product ID</th>
                    <th>Employee Name</th>
                </tr>
            </thead>

            <tbody>
                {rows.map((row) => {
                    const phone = row["Phone Number"];

                    return (
                        <tr key={row._id || row["Transaction ID"]}>
                            <td>{row["Transaction ID"]}</td>
                            <td>{row["Date"] ? String(row["Date"]).substring(0, 10) : ""}</td>
                            <td>{row["Customer ID"]}</td>
                            <td>{row["Customer Name"]}</td>

                            <td className="phone-cell">
                                <span className="phone-text">{phone}</span>

                                {phone && (
                                    <button
                                        type="button"
                                        className="copy-phone-btn"
                                        onClick={() => handleCopyPhone(phone)}
                                    >
                                        <img
                                            src="/copy.jpg"   /* must be inside public/ */
                                            alt="Copy"
                                            className="copy-icon-img"
                                        />
                                    </button>
                                )}
                            </td>

                            <td>{row["Gender"]}</td>
                            <td>{row["Age"]}</td>
                            <td>{row["Product Category"]}</td>
                            <td>{row["Quantity"]}</td>
                            <td>{row["Total Amount"]}</td>
                            <td>{row["Customer Region"]}</td>
                            <td>{row["Product ID"]}</td>
                            <td>{row["Employee Name"]}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
