function Pagination(props) {
  const { currentPage, setCurrentPage, dataPerPage, isDataLoading, data } =
    props;

  return (
    <div className="flex justify-between pt-1">
      <button
        onClick={() => {
          setCurrentPage((prevCurrentPage) => prevCurrentPage - 1);
        }}
        disabled={currentPage === 1 || isDataLoading}
        className={`${currentPage === 1 || isDataLoading ? "text-slate-500 cursor-not-allowed" : "cursor-pointer"}`}
      >
        Previous
      </button>
      <span>{currentPage}</span>
      <button
        onClick={() => {
          setCurrentPage((prevCurrentPage) => prevCurrentPage + 1);
        }}
        disabled={data.length < dataPerPage || isDataLoading}
        className={`${data.length < dataPerPage ? "text-slate-500 cursor-not-allowed" : "cursor-pointer"}`}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
