import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCountryByName } from '../../Redux/Actions/actions'

export default function SearchBar() {
   const dispatch = useDispatch();
   const [name, setName] = useState('');

   const handleInputChange = (event) => {
      const searchText = event.target.value;
      setName(searchText);
      dispatch(getCountryByName(searchText));
   };
   console.log("QUE NOMBRE TENGO COMPONENTE", name)
   return (
      <div>
         <label htmlFor="searchInput">Search your Country: </label>
         <input
            type="text"
            id="searchInput"
            value={name}
            onChange={handleInputChange}
         />
      </div>
   );
}

/*
export default function SearchBar() {
   const dispatch = useDispatch();
   const [name, setName] = useState('');

   const inputHandler = (event) => {
      event.preventDefault();
      setName(event.target.value);
   };
   console.log("QUE NOMBRE TENGO COMPONENTE", name)
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
*/