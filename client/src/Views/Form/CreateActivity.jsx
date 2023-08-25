import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postActivities, getAllCountries, disassembleCountries } from '../../Redux/Actions/actions';
import { Link } from 'react-router-dom';
import Multiselect from 'multiselect-react-dropdown';
import style from './Form.module.css';

const validation = (input) => {
    let errors = {};
    const regexName = /^[a-zA-Z ]+$/;
    const regexNum = /^[1-96][0-9]?$/; // /^[0-9]+$/;

    if (!regexName.test(input.name)) {
        errors.name = "The Name must only contain letters."
    }
    if (input.name === "") {
        errors.name = "*This field Name is required.*"
    }
    if (input.difficulty === "") {
        errors.difficulty = "*This field Difficulty is required.*"
    }
    if (!regexNum.test(input.duration)) {
        errors.duration = "Duration must only contain numbers between 1 and 99."
    }
    if (input.duration === "") {
        errors.duration = "*This field Duration is required.*"
    }
    if (input.season === "") {
        errors.season = "*This field Season is required.*"
    }
    if (input.countryId === 0) {
        errors.countryId = "*Select at least one country.*"
    }
    return errors;
}

export default function CreateActivity() {
    const dispatch = useDispatch();
    const countries = useSelector(state => state.allCountries);

    useEffect(() => {
        dispatch(getAllCountries());
        return () => dispatch(disassembleCountries());
    }, [dispatch]);

    //INICIO ========================================================================
    const [selectedCountries, setSelectedCountries] = useState([]);
    const countryOptions = countries.map(country => ({
        key: country.id,
        id: country.id,
        value: country.name
    }));
    const handleCountrySelect = (selectedList) => {
        setSelectedCountries(selectedList);
    };
    //FIN ======================================================================

    const [selectedCountryIds, setSelectedCountryIds] = useState([]);
    const [activity, setActivity] = useState({
        name: "",
        difficulty: "",
        duration: "",
        season: ""
    });
    const [errors, setErrors] = useState({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        countries: "",
    });

    /*const validateField = (field, value) => {
        return value.trim() === "" ? "Required field" : "";
    };*/
    /*const validateField = (field, value) => {
        if (field === "name" || field === "duration") {
            return value.trim() === "" ? "Required field" : "";
        }
        return "";
    }*/

    const handleChange = (event) => {
        const { id, value } = event.target;

        if (id === 'countryId') {
            const selectedValue = value;
            setSelectedCountryIds(prevIds =>
                prevIds.includes(selectedValue)
                    ? prevIds.filter(id => id !== selectedValue)
                    : [...prevIds, selectedValue]
            );
        } else {
            setActivity({
                ...activity,
                [id]: value
            });

            /*const errorMessage = validateField(id, value);
            setErrors({
                ...errors,
                [id]: errorMessage
            });*/
        }

        setErrors(
            validation({
                ...activity,
                [event.target.id]: event.target.value
            })
        )
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (selectedCountryIds.length === 0) {
            alert("Select at least one country");
            return;
        }

        const newActivity = {
            ...activity,
            countries: selectedCountryIds
        };

        dispatch(postActivities(newActivity));

        setActivity({
            name: "",
            difficulty: "",
            duration: "",
            season: ""
        });

        setSelectedCountryIds([]);
    };

    /*const isSubmitDisabled = () => {
        return selectedCountryIds.length === 0 || Object.values(activity).some(value => value.trim() === "");
    };
    const isSubmitDisabled = () => {
        return selectedCountryIds.length === 0 || Object.values(errors).some(err => err.trim() !== "");
    };*/

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
                        {errors.name ? <label className={style.errorMessage}>{errors.name}</label> : null}
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
                        <label className={style.errorMessage} htmlFor="difficulty">{errors.difficulty}</label>
                    </div>

                    <br />

                    <div>
                        <label className={style.formLabel} htmlFor="duration">Duration in hours: </label>
                        <input onChange={handleChange} type="text" id='duration' />
                        {errors.duration ? <label className={style.errorMessage}>{errors.duration}</label> : null}
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
                        {errors.season ? <label className={style.errorMessage}>{errors.season}</label> : null}
                    </div>

                    <br />
                    <div>
                        <label className={style.formLabel} htmlFor="countryId">Countries: </label>

                        {/* COMENTARIO */}
                        <Multiselect
                            options={countryOptions}
                            displayValue="value"
                            selectedValues={selectedCountries}
                            onSelect={handleCountrySelect}
                            onRemove={handleCountrySelect}
                            placeholder="Select countries"
                        />



                        {errors.countryId ? <label className={style.errorMessage}>{errors.countryId}</label> : null}
                    </div>
                    <br />
                    <button type='submit'>Create activity</button>
                    <Link to='/home'>Cancel</Link>
                </form>
            </div >
        </div >
    );
}


/*
<select
                            className={style.select}
                            id="countryId"
                            multiple
                            value={selectedCountryIds}
                            onChange={handleChange}
                        >
                            <option value="">Select countries</option>
                            {countries.map(country => (
                                <option key={country.id} value={country.id}>
                                    {country.name}
                                </option>
                            ))}
                        </select>
*/




/* import React, { useState, useEffect } from 'react'
import { postActivities, getAllCountries, disassembleCountries } from '../../Redux/Actions/actions'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import style from './Form.module.css'

export default function CreateActivity() {
    const dispatch = useDispatch(); // Hook para despachar acciones de redux
    const countries = useSelector(state => state.allCountries);

    useEffect(() => {
        dispatch(getAllCountries());
        return () => dispatch(disassembleCountries())
    }, [dispatch])

    const [selectedCountryIds, setSelectedCountryIds] = useState([]);

    const [activity, setActivity] = useState({ // Estado local: Almacena valores del formulario
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        countryId: ""
    })
    const [error, setError] = useState({ // Estado local: Almacena mensaje de error
        name: "Required field",
        difficulty: "Required field",
        duration: "Required field",
        season: "Required field",
        countryId: "Required field"
    })

    //! Función que maneja el cambio en campo Activity
    const handleChange = (event) => {
        if (event.target.id === 'countryId') {
            const selectedValue = event.target.value;
            if (selectedCountryIds.includes(selectedValue)) {
                setSelectedCountryIds(selectedCountryIds.filter(id => id !== selectedValue));
            } else {
                setSelectedCountryIds([...selectedCountryIds, selectedValue]);
            }
        } else {
            setActivity({
                ...activity,
                [event.target.id]: event.target.value
            });
            validate({
                [event.target.id]: event.target.value
            }, event.target.id);
        }
    };

    //! función: determina si el botón Enviar debe estar deshabilitado
    const disable = () => {
        return (
            Object.values(error).some(err => err.trim() !== "Required field") ||
            selectedCountryIds.length === ""
        );
    };

    //! Validamos cada campo y actualiza los mensajes de error
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
        if (id === 'season') {
            if (state[id].trim() !== "") setError({
                ...error,
                season: ""
            })
            else setError({
                ...error,
                season: "Required field"
            })
        }
        if (id === 'countryId') {
            if (state[id].length > 0) {
                setError({
                    ...error,
                    countryId: ""
                });
            } else {
                setError({
                    ...error,
                    countryId: "Select at least one country"
                });
            }
        }
    }

    //! Para manejar el envío del formulario.
    const handleSubmit = (event) => {
        event.preventDefault() // Evita que se recargue la página.
        dispatch(postActivities(activity)) // Envía la actividad creada al estado global.
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
                    <div>
                        <label className={style.formLabel} htmlFor="value1">Countries: </label>
                        <select
                            className={style.select}
                            id="countryId"
                            multiple
                            value={selectedCountryIds}
                            onChange={handleChange}
                        >
                            {countries.map(country => (
                                <option key={country.id} value={country.id}>
                                    {country.name}
                                </option>
                            ))}
                        </select>

                        <label className={style.errorMessage} htmlFor="countryId">{error.countryId}</label>
                    </div>
                    <br />
                    <button disabled={disable()} type='Submit'>Create activity</button>
                    <Link to='/home'>Cancel</Link>

                </form>
            </div >
        </div >
    )
}
 */