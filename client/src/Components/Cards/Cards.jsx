import style from './Cards.module.css'
import Card from '../../Components/Card/Card'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getAllCountries, disassembleCountries } from '../../Redux/Actions/actions'
import Sorting from '../Sorting/Sorting'
import Filters from '../Filters/Filters'
import Paginated from '../Paginated/Paginated'

export default function Cards() {
   const dispatch = useDispatch();
   const countries = useSelector(state => state.allCountries);
   const currentPage = useSelector(state => state.numPage)
   const [filteredCountries, setFilteredCountries] = useState([]);

   const handleFilterChange = (filtered) => {
      setFilteredCountries(filtered);
   }

   useEffect(() => {
      setFilteredCountries(countries);
   }, [countries])

   useEffect(() => {
      dispatch(getAllCountries());
      return () => dispatch(disassembleCountries())
   }, [dispatch])

   const cardsXPage = 10;
   const startIndex = (currentPage - 1) * cardsXPage;
   const endIndex = startIndex + cardsXPage;
   const countriesPage = filteredCountries.slice(startIndex, endIndex);
   const totalPages = Math.ceil(filteredCountries.length / cardsXPage);

   return (
      <div>
         <div className={style.optionsContainer}>
            <div className={style.column}><Sorting countries={countries} /></div>
            {/* <div className={style.column}><Filters countries={countries} /></div> */}
            <div className={style.column}><Filters countries={countries} onFilterChange={handleFilterChange} /></div>

         </div>
         <Paginated totalPages={totalPages} />
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