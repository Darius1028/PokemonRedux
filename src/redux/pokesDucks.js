import axios from "axios";

const dataInit = {
  count: 0,
  next: null,
  previous: null,
  results: [],
  offset: 0,
  pokemon: {},
};

// types
const GET_POKEMONS_SUCCESS = "GET_POKEMONS_SUCCESS";
const NEXT_POKEMONS_SUCCESS = "NEXT_POKEMONS_SUCCESS";
const PREVIOUS_POKEMONS_SUCCESS = "PREVIOUS_POKEMONS_SUCCESS";
const INFO_POKEMON_SUCCESS = "INFO_POKEMON_SUCCESS";
const CLEAR_INFO_POKEMON_SUCCESS = "CLEAR_INFO_POKEMON_SUCCESS";

// Reducer
export default function pokeReducer(state = dataInit, action) {
  switch (action.type) {
    case GET_POKEMONS_SUCCESS:
      return { ...state, ...action.payload };
    case NEXT_POKEMONS_SUCCESS:
      return { ...state, ...action.payload };
    case PREVIOUS_POKEMONS_SUCCESS:
      return { ...state, ...action.payload };
    case INFO_POKEMON_SUCCESS:
      return { ...state, pokemon: action.payload };
    case CLEAR_INFO_POKEMON_SUCCESS:
      return { ...state, pokemon: action.payload };
    default:
      return state;
  }
}

// Actions
export const getPokemonsAction = (page) => async (dispatch, getState) => {
  if (!page) {
    page = 0;
  }
  try {
    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?offset=${page * 10}&limit=10`
    );
    dispatch({
      type: GET_POKEMONS_SUCCESS,
      payload: {
        results: res.data.results,
        offset: page,
        count: res.data.count,
        next: res.data.next,
        previous: res.data.previous,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const nextPokemonsAction = () => async (dispatch, getState) => {
  const { next, offset } = getState().pokemons;
  if (next) {
    try {
      const res = await axios.get(next);
      dispatch({
        type: NEXT_POKEMONS_SUCCESS,
        payload: {
          results: res.data.results,
          offset: offset + 1,
          count: res.data.count,
          next: res.data.next,
          previous: res.data.previous,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
};

export const previousPokemonsAction = () => async (dispatch, getState) => {
  const { previous, offset } = getState().pokemons;
  if (previous) {
    try {
      const res = await axios.get(previous);
      dispatch({
        type: PREVIOUS_POKEMONS_SUCCESS,
        payload: {
          results: res.data.results,
          offset: offset - 1,
          count: res.data.count,
          next: res.data.next,
          previous: res.data.previous,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
};

export const infoPokemonAction = (url) => async (dispatch, getState) => {
  try {
    const res = await axios.get(url);
    console.log(res.data);
    dispatch({
      type: PREVIOUS_POKEMONS_SUCCESS,
      payload: {
        pokemon: res.data,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const clearInfoPokemonAction = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: PREVIOUS_POKEMONS_SUCCESS,
        payload: {
          pokemon: {},
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  