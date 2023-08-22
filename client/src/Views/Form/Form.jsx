import { useState } from 'react'
import style from './Form.module.css'
import { postActivities } from '../../Redux/Actions/actions'
import { useDispatch } from 'react-redux'

export default function Form() {

    //? Hook para despachar acciones de redux.
    const dispatch = useDispatch();

    //? Estado local: Almacenar valores del formulario  y mensajes de error.
    const [activity, setActivity] = useState({
        name: "",
        dificultad: "",
        duración: "",
        temporada: ""
    })
    const [error, setError] = useState({
        name: "Campo requerido",
        dificultad: "Campo requerido",
        duración: "Campo requerido",
        temporada: "Campo requerido"
    })

    //? Función que maneja el cambio en los campos del formulario.
    const handleChange = (event) => {
        //?Se actualiza el estado de la actividad con los nuevos valores, manteniendo los valores previos.
        setActivity({
            ...activity,
            [event.target.id]: event.target.value
        });
        //? Valida el campo modificado y actualiza los mensajes de error.
        validate({
            [event.target.id]: event.target.value
        }, event.target.id)
    }

    //? Esta función determina si el botón de envío debe estar deshabilitado.
    const disable = () => {
        return Object.values(error)
            .some(err => err !== "Campo requerido");
    };

    //? Valida cada campo y actualiza los mensajes de error según sea el caso.   
    const validate = (state, id) => {
        if (id === 'name') {
            if (state[id] != "") setError({
                ...error,
                name: ""
            })
            else setError({
                ...error,
                name: "Campo requerido"
            })
        }
        if (id === 'dificultad') {
            if (state[id] != "") setError({
                ...error,
                dificultad: ""
            })
            else setError({
                ...error,
                dificultad: "Campo requerido"
            })
        }
        if (id === 'duración') {
            if (state[id] != "") setError({
                ...error,
                duración: ""
            })
            else setError({
                ...error,
                duración: "Campo requerido"
            })
        }
        if (id === 'temporada') {
            if (state[id] != "") setError({
                ...error,
                temporada: ""
            })
            else setError({
                ...error,
                temporada: "Campo requerido"
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
                <h2>Actividades turísticas</h2>
                <h4>Formulario de creación</h4>
            </div>
            <div>
                <form className={style.formContainer} onSubmit={handleSubmit}>

                    <div>
                        <label className={style.formLabel} htmlFor="name">Nombre: </label>
                        <input className={style.formInput} onChange={handleChange} type="text" id='name' />
                        <label className={style.errorMessage} htmlFor="name">{error.name}</label>
                    </div>

                    <br />

                    <div>
                        <label className={style.formLabel} htmlFor="dificultad">Dificultad: </label>
                        <input className={style.formInput} onChange={handleChange} type="text" id='dificultad' />
                        <label className={style.errorMessage} htmlFor="dificultad">{error.dificultad}</label>
                    </div>

                    <br />

                    <div>
                        <label className={style.formLabel} htmlFor="duración">Duración: </label>
                        <input className={style.formInput} onChange={handleChange} type="text" id='duración' />
                        <label className={style.errorMessage} htmlFor="duración">{error.duración}</label>
                    </div>

                    <br />

                    <div>
                        <label className={style.formLabel} htmlFor="temporada">Temporada: </label>
                        <input className={style.formInput} onChange={handleChange} type="text" id='temporada' />
                        <label className={style.errorMessage} htmlFor="temporada">{error.temporada}</label>
                    </div>

                    <br />

                    <label className={style.formLabel} htmlFor="value1">Países: </label>
                    <select className={style.select}>
                        <option value="value1">Alemania</option>
                        <option value="value1">Italia</option>

                    </select>

                    <button disabled={disable()} className={style.formButton} type='Submit'>Create activity</button>
                </form>
            </div>
        </div>
    )
}
