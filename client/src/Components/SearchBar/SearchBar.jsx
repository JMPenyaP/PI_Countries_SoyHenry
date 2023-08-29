import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCountryByName } from '../../Redux/Actions/actions'
import style from './SearchBar.module.css';

export default function SearchBar() {
   const dispatch = useDispatch();
   const [name, setName] = useState('');

   const handleInputChange = (event) => {
      const searchText = event.target.value;
      setName(searchText);
      dispatch(getCountryByName(searchText));
   };

   const handleClearClick = () => {
      setName('');
      dispatch(getCountryByName(''));
   };

   return (
      <div>
         {/* <label htmlFor="searchInput">Search your Country: </label> */}
         <div className={style.catcher}>
            <input
               type="text"
               id="searchInput"
               value={name}
               onChange={handleInputChange}
               placeholder="Search your Country"
            />
            {name && (
               <button onClick={handleClearClick} style={{ marginLeft: '10px' }}>
                  Reset search
               </button>
            )}
         </div>
      </div>
   );
}



/*
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
*/