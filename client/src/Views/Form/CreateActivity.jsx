import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postActivities, getAllCountries, disassembleCountries } from '../../Redux/Actions/actions';
import { Link } from 'react-router-dom';
import Multiselect from 'multiselect-react-dropdown';
import style from './Form.module.css';

const validation = (input) => {
    let errors = {};
    const regexName = /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ ]+$/;
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
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        dispatch(getAllCountries());
        return () => dispatch(disassembleCountries());
    }, [dispatch]);

    const [selectedCountries, setSelectedCountries] = useState([]);

    const countryOptions = countries.map(country => ({
        //key: country.id,
        id: country.id,
        value: country.name
    }));

    const handleCountrySelect = (selectedList) => {

        setSelectedCountries(selectedList);

        const selectedCountryCodes = selectedList.map(country => country.id);
        console.log(selectedCountryCodes)
        setActivity({
            ...activity,
            countries: [...selectedCountryCodes]
        })
    };

    const [activity, setActivity] = useState({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        countries: []
    });

    const [errors, setErrors] = useState({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        countries: [],
    });

    const handleChange = (event) => {
        const { id, value } = event.target;

        setActivity({
            ...activity,
            [id]: value
        });

        setErrors(
            validation({
                ...activity,
                [event.target.id]: event.target.value
            })
        )
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (selectedCountries.length === 0) { // if (selectedCountryIds.length === 0) {
            alert("Select at least one country");
            return;
        }

        dispatch(postActivities(activity));

        setActivity({
            name: '',
            difficulty: "",
            duration: '',
            season: "",
            countries: []
        });

        setSelectedCountries([]);

        setSuccessMessage("Activity created successfully!");
        setTimeout(() => {
            setSuccessMessage("");
        }, 3000);
    };

    return (
        <div>
            <div className={style.head}>
                <h1>Tourist Activities</h1>
                <h3>Create new activity</h3>
            </div>
            <div>
                {successMessage && <p className={style.successMessage}>{successMessage}</p>}
                <form className={style.formContainer} onSubmit={handleSubmit}>
                    <div>
                        <label className={style.formLabel} htmlFor="name">Activity name: </label>
                        <input onChange={handleChange} type="text" id='name' value={activity.name} />
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
                        <input onChange={handleChange} type="text" id='duration' value={activity.duration} />
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
                        <label className={style.formLabel} >Countries: </label>
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