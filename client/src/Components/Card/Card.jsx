// Este es un componente Dumb
// No tiene estado y solo renderiza info
import style from './Card.module.css'
import { Link } from 'react-router-dom'

export default function Card({ id, name, flag, continent }) {
   return (
      <div className={style.card}>
         <h2 className={style.h2}>{name}</h2>
         <Link to={`/detail/${id}`}>
            <img className={style.image} src={flag} alt={`${name} Flag`} />
         </Link>
         <h4 className={style.h4}>{continent}</h4>
      </div>
   )
}