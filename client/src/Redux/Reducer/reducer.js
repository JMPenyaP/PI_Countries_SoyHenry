import { ActionTypes } from '../Actions/actionTypes'

const initialState = {
   allCountries: [],
   allCountriesCopy: [],
   countryDetail: {},
   allActivities: [],
   numPage: 1,
   filter: '',
   sortOption: ''
};

const reducer = (state = initialState, { type, payload }) => {
   switch (type) {
      case ActionTypes.GET_ALL_COUNTRIES:
         return {
            ...state,
            allCountries: payload,
            allCountriesCopy: payload
         };
      case ActionTypes.GET_COUNTRY_DETAIL:
         return {
            ...state,
            countryDetail: payload
         };
      case ActionTypes.DISASSEMBLE_DETAIL:
         return {
            ...state,
            countryDetail: {}
         };
      case ActionTypes.DISASSEMBLE_COUNTRIES:
         return {
            ...state,
            allCountries: []
         };
      case ActionTypes.GET_COUNTRIES_BY_NAME:
         return {
            ...state,
            allCountriesCopy: payload
         };
      case ActionTypes.NEXT_PAGE:
         return {
            ...state,
            numPage: state.numPage + 1
         };
      case ActionTypes.PREV_PAGE:
         return {
            ...state,
            numPage: state.numPage - 1
         };
      case ActionTypes.POST_ACTIVITIES:
         return {
            ...state,
            allActivities: payload
         };
      case ActionTypes.GET_ALL_ACTIVITIES:
         return {
            ...state,
            allActivities: payload
         }
      case ActionTypes.SET_FILTERED_COUNTRIES:
         return {
            ...state,
            allCountriesCopy: payload
         };
      case ActionTypes.SET_SORT_OPTION:
         return {
            ...state,
            sortOption: payload
         };
      case ActionTypes.GET_ALL_COUNTRIES_WITH_ACTIVITIES:
         return {
            ...state,
            allCountriesCopy: payload,
         };
      case ActionTypes.SET_NUM_PAGE:
         return {
            ...state,
            numPage: payload
         };
      default:
         return state;
   }
}

export default reducer;
