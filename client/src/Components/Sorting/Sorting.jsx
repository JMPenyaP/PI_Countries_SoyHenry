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

         <button onClick={handleSortChange} value="ASC">A - Z (by name)</button>
         <button onClick={handleSortChange} value="DESC">Z - A (by name)</button>
         <button onClick={handleSortChange} value="MORE">0 - 9 (by population)</button>
         <button onClick={handleSortChange} value="LESS">9 - 0 (by population)</button>
      </div>
   );
}
