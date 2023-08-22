import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCountries, disassembleCountries } from '../../Redux/Actions/actions'
import style from './SearchBar.module.css';

export default function SearchBar({ onSearchChange }) {
    const dispatch = useDispatch();
    const allCountries = useSelector(state => state.allCountries);
    const [searchValue, setSearchValue] = useState('');
    const [filteredCountries, setFilteredCountries] = useState([]);

    useEffect(() => {
        dispatch(getAllCountries());
        return () => dispatch(disassembleCountries())
    }, [dispatch])

    useEffect(() => {
        const lowerCaseSearch = searchValue.toLowerCase();
        const filtered = allCountries.filter(country =>
            country.name.toLowerCase().includes(lowerCaseSearch)
        );
        setFilteredCountries(filtered);
        onSearchChange(filtered); // Actualiza filteredCountries en Cards
    }, [searchValue, allCountries]);

    const inputHandler = (event) => {
        setSearchValue(event.target.value);
    };

    return (
        <div>
            <form>
                <label htmlFor="searchInput">Search your country by name</label>
                <input
                    type="search"
                    id="searchInput"
                    className={style.catcher}
                    value={searchValue}
                    onChange={inputHandler}
                />
            </form>
        </div>
    );
}