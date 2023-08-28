import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCountryByName } from '../../Redux/Actions/actions'

export default function SearchBar() {
   const dispatch = useDispatch();
   const [name, setName] = useState('');

   const inputHandler = (event) => {
      event.preventDefault();
      setName(event.target.value);
   };

   const submitHandler = () => {
      dispatch(getCountryByName(name));
   };

   return (
      <div>
         <label htmlFor="searchInput">Search your Country: </label>
         <input type="text" id={name} value={name} onChange={inputHandler} />
         <button onClick={() => { submitHandler(); setName('') }}>Search</button>
      </div>
   )
}