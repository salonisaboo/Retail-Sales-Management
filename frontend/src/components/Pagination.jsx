export default function Pagination({ currentPage, totalPages, onPageChange }) {
    if (!totalPages || totalPages <= 1) return null;

    const pages = [];
    const maxPagesToShow = 6;
    const visiblePages = Math.min(totalPages, maxPagesToShow);

    for (let i = 1; i <= visiblePages; i++) {
        pages.push(i);
    }

    return (
        <div className="pagination">
            <button
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
            >
                Prev
            </button>

            {pages.map((p) => (
                <button
                    key={p}
                    className={`page-btn ${p === currentPage ? "active" : ""}`}
                    onClick={() => onPageChange(p)}
                >
                    {p}
                </button>
            ))}

            <button
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
}
