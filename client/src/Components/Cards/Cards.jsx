/*
Componente Smart
Obtiene los datos de los países del Redux
Renderiza un componente Card para cada país en la lista de países
Utiliza el hook useEffect para llamar a la acción getAllCountries del Redux cuando se monta el componente

*/
import style from './Cards.module.css'
import Card from '../../Components/Card/Card'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getAllCountries, disassembleCountries } from '../../Redux/Actions/actions'
import Sorting from '../Sorting/Sorting'
import Filters from '../Filters/Filters'
import Paginated from '../Paginated/Paginated'

export default function Cards({ filteredCountries }) {
   const dispatch = useDispatch();
   const countries = useSelector(state => state.allCountries);
   const currentPage = useSelector(state => state.numPage)

   const qxpage = 10;
   const startIndex = (currentPage - 1) * qxpage;
   const endIndex = startIndex + qxpage;
   const countriesPage = filteredCountries.slice(startIndex, endIndex)

   useEffect(() => {
      dispatch(getAllCountries());
      return () => dispatch(disassembleCountries())
   }, [dispatch])

   return (
      <div>
         <div className={style.optionsContainer}>
            <div className={style.column}><Sorting countries={filteredCountries} /></div>
            <div className={style.column}><Filters countries={filteredCountries} /></div>
         </div>


         <Paginated filteredCountries={countriesPage} />
         <div className={style.container}>
            {filteredCountries.length > 0 ? (
               filteredCountries.map((country) => (
                  <Card
                     key={country.id}
                     id={country.id}
                     name={country.name}
                     flag={country.flag}
                     continent={country.continent}
                  />
               ))
            ) : (
               <h3 className={style.error}>No countries match {countries.error}</h3>
            )}
         </div>
      </div>
   )
}
