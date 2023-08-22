import { nextPage, prevPage } from '../../Redux/Actions/actions'
import { useDispatch, useSelector } from 'react-redux'

export default function Paginated(countries) {

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
         <h4>Page: {numPage}</h4>
         <div>
            <button onClick={prevHandler} disabled={numPage === 1}>Prev</button>

            <button onClick={nextHandler} >Next</button>
         </div>
      </div>
   )
}
