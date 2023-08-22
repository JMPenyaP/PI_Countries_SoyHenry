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
   PREV_PAGE
} from '../Actions/actionTypes'


//! Estado inicial de almacenamiento.
let initialState = {
   allCountries: [],
   allCountriesCopy: [],
   countryDetail: [],
   allActivities: [],
   countries: [],
   filteredCountries: [],
   numPage: 1,
};

const reducer = (state = initialState, { type, payload }) => {
   switch (type) {
      case GET_ALL_COUNTRIES:
         return {
            ...state,
            allCountries: payload,
            allCountriesCopy: payload
         }
      case GET_COUNTRY_DETAIL:
         return {
            ...state,
            countryDetail: payload
         }
      case DISASSEMBLE_DETAIL:
         return {
            ...state,
            countryDetail: {}
         }
      case DISASSEMBLE_COUNTRIES:
         return {
            ...state,
            allCountries: []
         }
      case GET_COUNTRIES_BY_NAME:
         return {
            ...state,
            allCountries: payload
         }
      case SORTING_COUNTRIES:
         return {
            ...state,
            allCountries: payload
         }
      case FILTERING_COUNTRIES:
         return {
            ...state,
            allCountries: payload
         }
      case NEXT_PAGE:
         return {
            ...state,
            numPage: state.numPage + 1
         }
      case PREV_PAGE:
         return {
            ...state,
            numPage: state.numPage - 1
         }
      // case POST_ACTIVITIES:
      //    return {
      //       ...state,
      //       allActivities: payload
      //    }
      // case GET_ACTIVITIES:
      //    return {
      //       ...state,
      //       allActivities: payload
      //    }
      // case GET_ACTIVITIES_WITH_COUNTRIES:
      //    return {
      //       ...state,
      //       allActivities: payload
      //    }
      default:
         return {
            ...state
         }
   }
}

export default reducer;