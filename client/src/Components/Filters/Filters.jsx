import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilteredCountries, getAllActivities, getAllCountriesWithActivities, getCountriesWithActivityByName } from '../../Redux/Actions/actions';
import styles from './Filters.module.css';
//import { element } from 'prop-types';

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
   const countriesCopy = useSelector(state => state.allCountriesCopy);
   const filteredCountries = useSelector(state => state.filteredCountries);
   const allActivities = useSelector(state => state.allActivities);
   console.log("TODAS LAS ACTIVITIES:====", allActivities)

   const handleFilterContinent = (event) => {
      const selectedContinent = event.target.value;
      if (selectedContinent === 'All') {
         dispatch(setFilteredCountries(countries));
      } else {
         const filtered = countries.filter(country => country.continent === selectedContinent);
         dispatch(setFilteredCountries(filtered));
      }
   }
   //INICIO===========================
   useEffect(() => {
      dispatch(getAllActivities())
   }, [dispatch])



   const handleFilterCountryWithActivity = (event) => {
      const selectedActivity = event.target.value;
      if (selectedActivity === 'All') {
         dispatch(getAllCountriesWithActivities());
      } else {
         dispatch(getCountriesWithActivityByName(selectedActivity));
      }
   }

   let values = allActivities.map(name => name.name);

   const onlyValues = [...new Set(values)];

   //FIN================================
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

         <select
            onChange={handleFilterCountryWithActivity}
            title="Select your Activity"
            name="activity"
         >
            <option>Select your Activity</option>
            <option key="All" value="All">All Activities</option>
            {onlyValues.map(option => (
               <option key={option} value={option}>{option}</option>
            ))}
         </select>

      </div>
   )
}
