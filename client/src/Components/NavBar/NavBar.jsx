import React from 'react'
import style from './NavBar.module.css'
import { Link } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'

export default function NavBar() {
   return (
      <div className={style.container}>
         <SearchBar />
      </div>
   )
}