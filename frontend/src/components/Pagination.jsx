import '../componentStyles/Pagination.css'
import { useSelector } from 'react-redux';

function Pagination({
  currentPage,
  onPageChange,
  // activeClass = 'active',
  nextPageText = "Next",
  prevPageText = "Prev",
  firstPageText = '1st',
  lastPageText = 'Last'
}) {
  const { totalPages, products } = useSelector((state) => state.product);

  if (products.length === 0 || totalPages <= 1) return null;

  //Generate Page numbers
  const getPageNumbers = () => {
    const pageNumbers = [];
    const pageWindow = 2;

    for (
      let i = Math.max(1, currentPage - pageWindow);
      i <= Math.min(totalPages, currentPage + pageWindow);
      i++
    ) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className="mt-24 flex flex-wrap items-center justify-center gap-2 rounded-lg p-2">

      {/* Previous and First Buttons*/}
      {
        currentPage > 1 && (
          <>
            <button
              className="rounded border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition-all duration-300 hover:bg-indigo-600 hover:text-white hover:shadow-md"
              onClick={() => onPageChange(1)}
            >
              {firstPageText}
            </button>

            <button
              className="rounded border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition-all duration-300 hover:bg-indigo-600 hover:text-white hover:shadow-md"
              onClick={() => onPageChange(currentPage - 1)}
            >
              {prevPageText}
            </button>
          </>
        )
      }

      {/*Display Numbers*/}
      {
        getPageNumbers().map((number) => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={
              currentPage === number
                ? "cursor-default rounded border border-indigo-700 bg-indigo-700 px-3 py-2 text-sm font-semibold text-white shadow"
                : "rounded border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition-all duration-300 hover:bg-indigo-600 hover:text-white hover:shadow-md"
            }
          >
            {number}
          </button>
        ))
      }

      {/* Last and Next Buttons*/}
      {
        currentPage < totalPages && (
          <>
            <button
              className="rounded border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition-all duration-300 hover:bg-indigo-600 hover:text-white hover:shadow-md"
              onClick={() => onPageChange(currentPage + 1)}
            >
              {nextPageText}
            </button>

            <button
              className="rounded border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition-all duration-300 hover:bg-indigo-600 hover:text-white hover:shadow-md"
              onClick={() => onPageChange(totalPages)}
            >
              {lastPageText}
            </button>
          </>
        )
      }

    </div>
  );
}

export default Pagination;