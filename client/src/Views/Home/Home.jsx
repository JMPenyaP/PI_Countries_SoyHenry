import style from './Home.module.css'
import NavBar from '../../Components/NavBar/NavBar'
import Cards from '../../Components/Cards/Cards'

export default function home() {
    return (
        <div className={style.homeContainer}>
            <h1>PROYECTO INDIVIDUAL  :::  COUNTRIES</h1>
            <NavBar />
            <Cards />
        </div>
    )
}