import axios from "axios";
import { ActionTypes } from './actionTypes';

export const getAllCountries = () => async (dispatch) => {
   try {
      const { data } = await axios.get("http://localhost:3001/countries");
      dispatch({ type: ActionTypes.GET_ALL_COUNTRIES, payload: data });
   } catch (error) {
      console.log(error);
   }
};

export const getCountryDetail = (id) => async (dispatch) => {
   try {
      const { data } = await axios.get(`http://localhost:3001/countries/${id}`);
      dispatch({ type: ActionTypes.GET_COUNTRY_DETAIL, payload: data });
   } catch (error) {
      console.log(error);
   }
};

export const disassembleCountries = () => ({ type: ActionTypes.DISASSEMBLE_COUNTRIES });

export const disassembleDetail = () => ({ type: ActionTypes.DISASSEMBLE_DETAIL });

export const nextPage = () => ({ type: ActionTypes.NEXT_PAGE });

export const prevPage = () => ({ type: ActionTypes.PREV_PAGE });

export const getCountryById = (id) => async (dispatch) => {
   try {
      const { data } = await axios.get(`http://localhost:3001/countries/${id}`);
      dispatch({ type: ActionTypes.GET_COUNTRIES_BY_ID, payload: data });
   } catch (error) {
      console.log(error);
   }
};

export const getCountryByName = (name) => async (dispatch) => {
   try {
      const lowerCaseName = name.toLowerCase();
      const response = await axios.get(`http://localhost:3001/countries`);
      const filterCountry = response.data.filter(country =>
         country.name.toLowerCase().includes(lowerCaseName));
      dispatch({ type: ActionTypes.GET_COUNTRIES_BY_NAME, payload: filterCountry });
   } catch (error) {
      dispatch({ type: "ERROR_OCCURRED", payload: error.message });
   }
};

export const postActivities = (createActivity) => async (dispatch) => {
   try {
      const response = await axios.post("http://localhost:3001/activities", createActivity);
      dispatch({ type: ActionTypes.POST_ACTIVITIES, payload: response.data });
   } catch (error) {
      console.log(error);
   }
};

export const getAllActivities = () => async (dispatch) => {
   try {
      const response = await axios.get("http://localhost:3001/countries/activities");
      dispatch({ type: ActionTypes.GET_ACTIVITIES, payload: response.data });
   } catch (error) {
      console.log(error);
   }
};

export const getAllActivitiesWCountries = () => async (dispatch) => {
   try {
      const response = await axios.get("http://localhost:3001/countries/activities/countries");
      dispatch({ type: ActionTypes.GET_ACTIVITIES_WITH_COUNTRIES, payload: response.data });
   } catch (error) {
      console.log(error);
   }
};

export const setFilteredCountries = (filteredCountries) => ({
   type: ActionTypes.SET_FILTERED_COUNTRIES,
   payload: filteredCountries
});

export const setSortOption = (sortOption) => ({
   type: ActionTypes.SET_SORT_OPTION,
   payload: sortOption
});