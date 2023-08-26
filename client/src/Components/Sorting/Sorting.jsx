import React, { useState } from 'react'
import { filteringCountries, sortingCountries } from '../../Redux/Actions/actions';
import { useDispatch } from 'react-redux';
import styles from './Sorting.module.css';

export default function Sorting({ onSortChange }) {
   const handleSortChange = (event) => {
      const sortOption = event.target.value;
      onSortChange(sortOption);

   }
   return (
      <div className={styles.container}>
         <h4>Sorting</h4>

         <button onClick={handleSortChange} value="ASC">A - Z (ASC)</button>
         <button onClick={handleSortChange} value="DESC">Z - A (DESC)</button>
         <button onClick={() => handleSort('population', 'more')} title='Click here to sort by amount of population (More)'>More population</button>
         <button onClick={() => handleSort('population', 'less')} title='Click here to sort by amount of population (Less)'>Less population</button>
      </div>
   );
}

/*
<select onChange={handleSortChange}>
            <option value="">Select</option>
            <option value="ASC">By Name (A-Z)</option>
            <option value="DESC">By Name (Z-A)</option>
         </select>
*/

/*
export default function Sort({ countries }) {
   const [sort, setSort] = useState([]);
   const dispatch = useDispatch();

   const handleSort = (key, type) => {
      const toSort = [...countries];

      toSort.sort((a, b) => {
         if (type === 'asc') {
            return a[key] > b[key] ? 1 : -1;
         }
         else if (type === 'desc') {
            return a[key] < b[key] ? 1 : -1;
         }
         else if (type === 'less') {
            return a[key] < b[key] ? -1 : 1;
         }
         else if (type === 'more') {
            return a[key] > b[key] ? -1 : 1;
         }
      });
      setSort(toSort);
      dispatch(sortingCountries(toSort));
   }

   return (
      <div className={styles.container}>
         <h4>Sorting</h4>
         <button onClick={() => handleSort('name', 'asc')} title='Click here to sort ascending'>A-Z (ASC)</button>
         <button onClick={() => handleSort('name', 'desc')} title='Click here to sort descending'>Z-A (DESC)</button>
         <button onClick={() => handleSort('population', 'more')} title='Click here to sort by amount of population (More)'>More population</button>
         <button onClick={() => handleSort('population', 'less')} title='Click here to sort by amount of population (Less)'>Less population</button>

      </div>
   )
}*/
