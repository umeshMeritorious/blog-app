const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 mr-2 text-sm font-medium text-gray-600 bg-gray-200 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Prev
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 mx-1 text-sm font-medium rounded-md ${
            currentPage === page
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-600 hover:bg-gray-300"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 ml-2 text-sm font-medium text-gray-600 bg-gray-200 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
