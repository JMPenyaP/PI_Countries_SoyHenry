import style from './Cards.module.css'
import Card from '../../Components/Card/Card'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getAllCountries, disassembleCountries } from '../../Redux/Actions/actions'
import Sorting from '../Sorting/Sorting'
import Filters from '../Filters/Filters'
import Paginated from '../Paginated/Paginated'

export default function Cards() {
   const dispatch = useDispatch();
   const countries = useSelector(state => state.allCountries);
   const currentPage = useSelector(state => state.numPage)

   useEffect(() => {
      dispatch(getAllCountries());
      return () => dispatch(disassembleCountries())
   }, [dispatch])

   const qxpage = 10;
   const startIndex = (currentPage - 1) * qxpage;
   const endIndex = startIndex + qxpage;
   const countriesPage = countries.slice(startIndex, endIndex)

   return (
      <div>
         <div className={style.optionsContainer}>
            <div className={style.column}><Sorting countries={countries} /></div>
            <div className={style.column}><Filters countries={countries} /></div>
         </div>
         <Paginated />
         <div className={style.container}>
            {countriesPage.length > 0 ? (
               countriesPage.map((country) => (
                  <Card
                     key={country.id}
                     id={country.id}
                     name={country.name}
                     flag={country.flag}
                     continent={country.continent}
                  />
               ))
            ) : (
               <h3 className={style.error}>No countries match. {countries.error}</h3>
            )}
         </div>
      </div>
   )
}