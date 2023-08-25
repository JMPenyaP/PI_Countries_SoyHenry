import axios from "axios"
import {
   GET_ALL_COUNTRIES,
   GET_COUNTRY_DETAIL,
   DISASSEMBLE_COUNTRIES,
   DISASSEMBLE_DETAIL,
   GET_COUNTRIES_BY_ID,
   GET_COUNTRIES_BY_NAME,
   SORTING_COUNTRIES,
   FILTERING_COUNTRIES,
   POST_ACTIVITIES,
   GET_ACTIVITIES,
   GET_ACTIVITIES_WITH_COUNTRIES,
   NEXT_PAGE,
   PREV_PAGE,
} from './actionTypes'

export const getAllCountries = () => {
   return async (dispatch) => {
      try {
         const { data } = await axios.get("http://localhost:3001/countries");
         dispatch({ type: GET_ALL_COUNTRIES, payload: data })
      } catch (error) {
         console.log(error);
      }
   }
};

export const getCountryDetail = (id) => {
   return async (dispatch) => {
      try {
         const { data } = await axios.get(`http://localhost:3001/countries/${id}`);
         dispatch({ type: GET_COUNTRY_DETAIL, payload: data })
      } catch (error) {
         console.log(error);
      }
   }
};

export const disassembleCountries = () => {
   return { type: DISASSEMBLE_COUNTRIES }
}

export const disassembleDetail = () => {
   return { type: DISASSEMBLE_DETAIL }
}

export const sortingCountries = (sort) => ({
   type: SORTING_COUNTRIES,
   payload: sort
});

export const filteringCountries = (continent) => ({
   type: FILTERING_COUNTRIES,
   payload: continent
})

export const nextPage = () => {
   return {
      type: NEXT_PAGE,
   }
}

export const prevPage = () => {
   return {
      type: PREV_PAGE,
   }
}

export const getCountryById = (id) => {
   return async (dispatch) => {
      try {
         const { data } = await axios.get(`http://localhost:3001/countries/${id}`);
         dispatch({ type: GET_COUNTRIES_BY_ID, payload: data })
      } catch (error) {
         console.log(error);
      }
   }
};


export const getCountryByName = (name) => {
   return async (dispatch) => {
      try {
         const lowerCaseName = name.toLowerCase();
         const response = await axios.get(`http://localhost:3001/countries/?name=${name}`);
         const filteredCountries = response.data.filter(country =>
            country.name.toLowerCase().includes(lowerCaseName));
         dispatch({ type: GET_COUNTRIES_BY_NAME, payload: filteredCountries })
      } catch (error) {
         dispatch({ type: ERROR_OCCURRED, payload: error.message });
      }
   }
};

export const postActivities = (createActivity) => {
   return async (dispatch) => {
      try {
         const response = await axios.post("http://localhost:3001/activities", createActivity);
         dispatch({ type: POST_ACTIVITIES, payload: response.data })
      } catch (error) {
         console.log(error);
      }
   }
};

export const getAllActivities = () => {
   return async (dispatch) => {
      try {
         const response = await axios.get("http://localhost:3001/countries/activities");
         dispatch({ type: GET_ACTIVITIES, payload: response.data })
      } catch (error) {
         console.log(error);
      }
   }
};

export const getAllActivitiesWCountries = () => {
   return async (dispatch) => {
      try {
         const response = await axios.get("http://localhost:3001/countries/activities/countries");
         dispatch({ type: GET_ACTIVITIES_WITH_COUNTRIES, payload: response.data })
      } catch (error) {
         console.log(error);
      }
   }
};