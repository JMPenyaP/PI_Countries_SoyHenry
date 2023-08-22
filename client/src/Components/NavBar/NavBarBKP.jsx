import React from 'react'
import style from './NavBar.module.css'
import SearchBar from '../SearchBar/SearchBar'

export default function NavBar({ onSearchChange }) {
    return (
        <div className={style.container}>
            <SearchBar onSearchChange={onSearchChange} />
        </div>
    )
}