import { nextPage, prevPage } from '../../Redux/Actions/actions'
import { useDispatch, useSelector } from 'react-redux'

export default function Paginated({ totalPages }) {

   const { numPage } = useSelector(state => state)
   const dispatch = useDispatch();

   const nextHandler = () => {
      dispatch(nextPage())
   }

   const prevHandler = () => {
      dispatch(prevPage())
   }

   return (
      <div>
         <h4>Page: {numPage}/{totalPages}</h4>
         <div>
            <button onClick={prevHandler} disabled={numPage === 1}>Prev</button>
            <button onClick={nextHandler} disabled={numPage === totalPages}>Next</button>
         </div>
      </div>
   )
}
