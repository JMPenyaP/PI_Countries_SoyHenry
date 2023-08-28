import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './Cards.module.css';
import Card from '../../Components/Card/Card';
import { getAllCountries, disassembleCountries, setFilteredCountries } from '../../Redux/Actions/actions';
import Sorting from '../Sorting/Sorting';
import Filters from '../Filters/Filters';
import Paginated from '../Paginated/Paginated';

export default function Cards() {
   const dispatch = useDispatch();
   const countries = useSelector(state => state.allCountriesCopy);
   const currentPage = useSelector(state => state.numPage);
   //const filteredCountries = useSelector(state => state.filteredCountries);
   const sortOption = useSelector(state => state.sortOption);
   const filter = useSelector(state => state.filter);

   useEffect(() => {
      dispatch(getAllCountries());
      return () => dispatch(disassembleCountries());
   }, [dispatch]);
   /*
      useEffect(() => {
         dispatch(sortCountries(sortOption, countries));
         dispatch(filterCountries(filter, countries));
      }, [dispatch, sortOption, filter, countries]);
   */
   const cardsPerPage = 10;
   const startIndex = (currentPage - 1) * cardsPerPage;
   const endIndex = startIndex + cardsPerPage;
   const countriesPage = countries.slice(startIndex, endIndex);
   console.log("===========", countriesPage)
   const totalPages = Math.ceil(countries.length / cardsPerPage);
   /*
      useEffect(() => {
         let sortedCountries = [...countries];
   
         if (sortOption === 'ASC') {
            sortedCountries.sort((a, b) => a.name.localeCompare(b.name));
         } else if (sortOption === 'DESC') {
            sortedCountries.sort((a, b) => b.name.localeCompare(a.name));
         } else if (sortOption === 'MORE') {
            sortedCountries.sort((a, b) => a.population - b.population);
         } else if (sortOption === 'LESS') {
            sortedCountries.sort((a, b) => b.population - a.population);
         }
   
         dispatch(setFilteredCountries(sortedCountries));
      }, [dispatch, countries, sortOption]);
   */
   return (
      <div>
         <div className={style.optionsContainer}>
            <div className={style.column}><Sorting /></div>
            <div className={style.column}><Filters /></div>
         </div>
         <Paginated totalPages={totalPages} />
         <div className={style.container}>
            {countriesPage.length > 0 ? (
               countriesPage.map(country => (
                  <Card
                     key={country.id}
                     id={country.id}
                     name={country.name}
                     flag={country.flag || 'No Flag'}
                     continent={country.continent}
                     population={country.population || 'No data'}
                  />
               ))
            ) : (
               <h3 className={style.error}>No countries match.</h3>
            )}
         </div>
      </div>
   );
}
