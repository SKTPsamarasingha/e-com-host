const Pagination = ({pagination, setPagination}) => {
    const {page, totalPages} = pagination;

    return (
        <div className="flex justify-center items-center gap-4 mt-8">
            <button
                disabled={page === 1}
                onClick={() =>
                    setPagination((p) => ({...p, page: p.page - 1}))
                }
                className="px-4 py-2 border rounded disabled:opacity-50 cursor-pointer"
            >
                Prev
            </button>

            <span>
                Page {page} of {totalPages}
            </span>

            <button
                disabled={page === totalPages}
                onClick={() =>
                    setPagination((p) => ({...p, page: p.page + 1}))
                }
                className="px-4 py-2 border rounded disabled:opacity-50 cursor-pointer"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
