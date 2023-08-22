import style from './DetailPage.module.css'
import { getCountryDetail, disassembleDetail } from '../../Redux/Actions/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';



export default function Detail() {
   const { id } = useParams();
   const dispatch = useDispatch();

   const countryDetail = useSelector(state => state.countryDetail);

   useEffect(() => {
      dispatch(getCountryDetail(id)); //*Dismount.
      return () => dispatch(disassembleDetail()) //*Unmount.
   }, []) //*Update.

   return (
      <div>
         <NavBar />
         <div className={style.container}>
            <h2 className={style.h2}>País: {countryDetail.name}</h2>
            <img className={style.image} src={countryDetail.flag} alt={`${countryDetail.name} Flag`} />
            <h4>Code: {countryDetail.id}</h4>
            <p>Continente: {countryDetail.continent}</p>
            <p>Capital: {countryDetail.capital}</p>
            <p>Subregión: {countryDetail.subregion}</p>
            <p>Área: {countryDetail.area}</p>
            <p>Población: {countryDetail.population}</p>
            <button className={style.backButton}>
               <Link to='/home'>Back</Link>
            </button>
         </div>
      </div>
   )
}

