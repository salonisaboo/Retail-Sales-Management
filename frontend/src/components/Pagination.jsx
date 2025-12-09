// Pagination.jsx
export default function Pagination({ currentPage, totalPages, onPageChange }) {
    if (!totalPages || totalPages <= 1) return null;

    const pages = [];
    const maxPagesToShow = 6;

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
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