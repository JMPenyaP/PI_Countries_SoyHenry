import React, { useState } from 'react';
import { nextPage, prevPage } from '../../Redux/Actions/actions'
import { useDispatch, useSelector } from 'react-redux';
/*
export default function PaginatedCountries({ filteredCountries }) {
   const itemsPerPage = 10;
   const [currentPage, setCurrentPage] = useState(1);

   const startIndex = (currentPage - 1) * itemsPerPage;
   const endIndex = startIndex + itemsPerPage;
   const countriesPage = filteredCountries.slice(startIndex, endIndex);

   const totalPages = Math.ceil(filteredCountries.length / itemsPerPage);

   const handleNextPage = () => {
      if (currentPage < totalPages) {
         setCurrentPage(currentPage + 1);
      }
   };

   const handlePrevPage = () => {
      if (currentPage > 1) {
         setCurrentPage(currentPage - 1);
      }
   };

   return (
      <div className="pagination">
         <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Prev
         </button>
         <span>
            Page {currentPage} of {totalPages}
         </span>
         <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next
         </button>
      </div>
   )
}
*/



export default function Paginated({ filteredCountries }) {
    const { numPage } = useSelector(state => state)
    const dispatch = useDispatch();

    const qxpage = 10;
    // Calcula el índice de inicio y fin para los resultados a mostrar en la página actual
    const startIndex = (numPage - 1) * qxpage;
    const endIndex = startIndex + qxpage;
    const visibleCountries = filteredCountries.slice(startIndex, endIndex);

    const nextHandler = () => {
        dispatch(nextPage())
    }

    const prevHandler = () => {
        dispatch(prevPage())
    }

    // Calcula la cantidad de páginas basándote en la cantidad de resultados filtrados
    const totalPages = Math.ceil(filteredCountries.length / qxpage);

    return (
        <div>
            <h4>Page: {numPage}</h4>
            <div>
                <button onClick={prevHandler} disabled={numPage === 1}>Prev</button>
                <span>{`${numPage} / ${totalPages}`}</span>
                <button onClick={nextHandler} disabled={numPage === totalPages}>Next</button>
            </div>
        </div>
    )
}
