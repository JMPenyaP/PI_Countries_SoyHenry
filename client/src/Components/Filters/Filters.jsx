import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { filteringCountries } from '../../Redux/Actions/actions';
import styles from './Filters.module.css';

export default function Filters({ countries }) {
   const dispatch = useDispatch();
   const [selectedContinent, setSelectedContinent] = useState('All');

   const handleFilterContinent = (event) => {
      const selectedContinent = event.target.value;
      setSelectedContinent(selectedContinent); // Update selectedContinent state

      if (selectedContinent === 'All') {
         //dispatch(filteringCountries(countries)); // Reset to original countries
         setSelectedContinent(countries);
      } else {
         const filteredCountries = countries.filter(country => country.continent === selectedContinent);
         dispatch(filteringCountries(filteredCountries));
      }
   }

   return (
      <div className={styles.container}>
         <h4>Filter By Continent: </h4>
         <select onChange={handleFilterContinent} value={selectedContinent} title='Click here to filter by continent' name="continent">
            <option value="All">All countries</option>
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






/*import React, { useState } from 'react'
import { filteringCountries } from '../../Redux/Actions/actions'
import { useDispatch } from 'react-redux'
import styles from './Filters.module.css';

export default function Filters({ countries }) {
   const dispatch = useDispatch();
   const [selectedContinent, setCurrentContinent] = useState('');

   const handleFilterContinent = (event) => {
      const toFilter = [...countries];
      const selectedContinent = event.target.value;

      if (selectedContinent === "All countries") {
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
         <select onChange={handleFilterContinent} title='Click here to filter by continent'>Continent
            <option value="All countries">All countries</option>
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
*/