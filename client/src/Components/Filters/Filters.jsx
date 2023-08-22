import React, { useState } from 'react'
import { filteringCountries } from '../../Redux/Actions/actions'
import { useDispatch } from 'react-redux';
import styles from './Filters.module.css';

export default function Filters({ countries }) {
   const dispatch = useDispatch();
   const [selectedContinent, setCurrentContinent] = useState('');

   const handleFilterContinent = (event) => {
      const toFilter = [...countries];
      const selectedContinent = event.target.value;

      if (selectedContinent === "All continents") {
         dispatch(filteringCountries(toFilter));
      }
      else {
         const filteredCountries = toFilter.filter(country => country.continent === selectedContinent);
         dispatch(filteringCountries(filteredCountries))
      }
      setCurrentContinent(selectedContinent);
   }

   return (
      <div className={styles.container}>
         <h4>Filter By Continent: </h4>
         <select onChange={handleFilterContinent} title='Click here to filter by continent'>
            continent
            <option value="All continents">All countries</option>
            <option value="Africa">Africa</option>
            <option value="Antarctica">Antarctica</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="North America">North America</option>
            <option value="South America">South America</option>
            <option value="Oceania">Oceania</option>
         </select>
      </div>
   )
}
