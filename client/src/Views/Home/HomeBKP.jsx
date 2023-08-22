import React, { useState } from 'react';
import style from './Home.module.css';
import NavBar from '../../Components/NavBar/NavBar';
import Cards from '../../Components/Cards/Cards';
import { Link } from 'react-router-dom';

export default function home() {
    const [searchValue, setSearchValue] = useState('');
    const [filteredCountries, setFilteredCountries] = useState([]);

    return (
        <div className={style.homeContainer}>
            <h1>PROYECTO INDIVIDUAL  :::  COUNTRIES</h1>
            <NavBar onSearchChange={setFilteredCountries} />
            <Cards filteredCountries={filteredCountries} />
        </div>
    )
}