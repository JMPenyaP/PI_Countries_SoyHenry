import style from './Landing.module.css';
import { Link } from 'react-router-dom';

export default function Landing() {

    return (
        <div className={style.page}>
            <div className={style.title}>
                <h1>
                    PROYECTO INDIVIDUAL ::: COUNTRIES
                </h1>
            </div>
            <div className={style.landingButton}>
                <Link to='/home'>Enter</Link>
            </div>
        </div>
    )
}
