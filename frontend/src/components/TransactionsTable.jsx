export default function TransactionsTable({ rows }) {
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
                {rows.map((row) => (
                    <tr key={row._id}>
                        <td>{row["Transaction ID"]}</td>
                        <td>{row["Date"] ? String(row["Date"]).substring(0, 10) : ""}</td>
                        <td>{row["Customer ID"]}</td>
                        <td>{row["Customer Name"]}</td>
                        <td>{row["Phone Number"]}</td>
                        <td>{row["Gender"]}</td>
                        <td>{row["Age"]}</td>
                        <td>{row["Product Category"]}</td>
                        <td>{row["Quantity"]}</td>
                        <td>{row["Total Amount"]}</td>
                        <td>{row["Customer Region"]}</td>
                        <td>{row["Product ID"]}</td>
                        <td>{row["Employee Name"]}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
