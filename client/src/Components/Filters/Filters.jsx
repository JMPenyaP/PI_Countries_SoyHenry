import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilteredCountries } from '../../Redux/Actions/actions';
import styles from './Filters.module.css';

const continentOptions = [
   { value: 'All', label: 'All countries' },
   { value: 'Africa', label: 'Africa' },
   { value: 'Antarctica', label: 'Antarctica' },
   { value: 'Asia', label: 'Asia' },
   { value: 'Europe', label: 'Europe' },
   { value: 'North America', label: 'North America' },
   { value: 'South America', label: 'South America' },
   { value: 'Oceania', label: 'Oceania' }
];

export default function Filters() {
   const dispatch = useDispatch();
   const countries = useSelector(state => state.allCountries);

   const handleFilterContinent = (event) => {
      const selectedContinent = event.target.value;
      if (selectedContinent === 'All') {
         dispatch(setFilteredCountries(countries)); // Reset to original countries

      } else {
         const filtered = countries.filter(country => country.continent === selectedContinent);
         dispatch(setFilteredCountries(filtered));
      }
   }

   return (
      <div className={styles.container}>
         <h4>Filter By Continent: </h4>
         <select
            onChange={handleFilterContinent}
            title='Click here to filter by continent'
            name="continent"
         >
            {continentOptions.map(option => (
               <option key={option.value} value={option.value}>
                  {option.label}
               </option>
            ))}
         </select>
      </div>
   )
}
