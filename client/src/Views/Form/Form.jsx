import { useState } from 'react'
import style from './Form.module.css'
import { postActivities } from '../../Redux/Actions/actions'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';

export default function Form() {

    //? Hook para despachar acciones de redux.
    const dispatch = useDispatch();

    //? Estado local: Almacenar valores del formulario  y mensajes de error.
    const [activity, setActivity] = useState({
        name: "",
        difficulty: "",
        duration: "",
        season: ""
    })
    const [error, setError] = useState({
        name: "Required field",
        difficulty: "Required field",
        duration: "Required field",
        season: "Required field"
    })

    //? Función que maneja el cambio en los campos del formulario.
    const handleChange = (event) => {// Se actualiza el estado de la actividad con los nuevos valores, manteniendo los valores previos.
        setActivity({
            ...activity,
            [event.target.id]: event.target.value
        });
        // Valida el campo modificado y actualiza los mensajes de error.
        validate({
            [event.target.id]: event.target.value
        }, event.target.id)
    }

    //? Esta función determina si el botón de envío debe estar deshabilitado.
    const disable = () => {
        return Object.values(error)
            .some(err => err.trim() !== "Required field");
    };

    //? Valida cada campo y actualiza los mensajes de error según sea el caso.   
    const validate = (state, id) => {
        if (id === 'name') {
            if (state[id].trim() !== "") setError({
                ...error,
                name: ""
            })
            else setError({
                ...error,
                name: "Required field"
            })
        }
        if (id === 'difficulty') {
            if (state[id].trim() !== "") setError({
                ...error,
                difficulty: ""
            })
            else setError({
                ...error,
                difficulty: "Required field"
            })
        }
        if (id === 'duration') {
            if (state[id].trim() !== "") setError({
                ...error,
                duration: ""
            })
            else setError({
                ...error,
                duration: "Required field"
            })
        }
        if (id === 'temporada') {
            if (state[id].trim() !== "") setError({
                ...error,
                season: ""
            })
            else setError({
                ...error,
                season: "Required field"
            })
        }
    }

    //? Para manejar el envío del formulario.
    const handleSubmit = (event) => {
        event.preventDefault() //? Evita que se recargue la página.
        dispatch(postActivities(activity)) //? Envía la actividad creada al estado global.
    }

    return (
        <div>
            <div className={style.head}>
                <h1>Tourist Activities</h1>
                <h3>Create new activity</h3>
            </div>
            <div>
                <form className={style.formContainer} onSubmit={handleSubmit}>

                    <div>
                        <label className={style.formLabel} htmlFor="name">Activity name: </label>
                        <input onChange={handleChange} type="text" id='name' />
                        <label className={style.errorMessage} htmlFor="name">{error.name}</label>
                    </div>

                    <br />

                    <div>
                        <label className={style.formLabel} htmlFor="difficulty">Difficulty: </label>
                        <select onChange={handleChange} id='difficulty' value={activity.difficulty}>
                            <option value="">Select difficulty</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <label className={style.errorMessage} htmlFor="difficulty">{error.difficulty}</label>
                    </div>

                    <br />

                    <div>
                        <label className={style.formLabel} htmlFor="duration">Duration in hours: </label>
                        <input onChange={handleChange} type="text" id='duration' />
                        <label className={style.errorMessage} htmlFor="duration">{error.duration}</label>
                    </div>

                    <br />

                    <div>
                        <label className={style.formLabel} htmlFor="season">Season: </label>
                        <select onChange={handleChange} id='season' value={activity.season}>
                            <option value={""}>Select season</option>
                            <option value={"Spring"}>Spring</option>
                            <option value={"Summer"}>Summer</option>
                            <option value={"Autumn"}>Autumn</option>
                            <option value={"Winter"}>Winter</option>
                        </select>
                        <label className={style.errorMessage} htmlFor="season">{error.season}</label>
                    </div>

                    <br />

                    <label className={style.formLabel} htmlFor="value1">Countries: </label>
                    <select className={style.select}>
                        <option value="value1">Alemania</option>
                        <option value="value2">Italia</option>
                    </select>

                    <button disabled={disable()} type='Submit'>Create activity</button>
                    <button><Link to='/home'>Cancel</Link>
                    </button>
                </form>
            </div >
        </div >
    )
}
