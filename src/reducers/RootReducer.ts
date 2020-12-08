import { ADD_CHARACTER, SET_CURRENT_CHARACTER, ADD_SPACESHIP, SET_CURRENT_SPACESHIP, CLEAR_CHARACTERS, CLEAR_SPACESHIPS, SET_IS_LOADING, SET_CURRENT_PAGE, SET_TOTAL_PAGES } from "../constants/ActionTypes";

const initialState = {
  characters: [],
  currentCharacter: null,
  spaceships: [],
  currentSpaceship: null,
  isLoading: false,
  currentPage: 1,
  totalPages: 0,
};

//@ts-ignore
const RootReducer = (state = initialState, action) => {
  if (action.type === ADD_CHARACTER) {
    return Object.assign({}, state, { characters: state.characters.concat(action.payload) });
  }

  if (action.type === SET_CURRENT_CHARACTER) {
    return Object.assign({}, state, { currentCharacter: action.payload });
  }

  if (action.type === CLEAR_CHARACTERS) {
    return Object.assign({}, state, { characters: [] });
  }

  if (action.type === ADD_SPACESHIP) {
    return Object.assign({}, state, { spaceships: state.spaceships.concat(action.payload) });
  }

  if (action.type === SET_CURRENT_SPACESHIP) {
    return Object.assign({}, state, { currentSpaceship: action.payload });
  }

  if (action.type === CLEAR_SPACESHIPS) {
    return Object.assign({}, state, { spaceships: [] });
  }

  if (action.type === SET_IS_LOADING) {
    return Object.assign({}, state, { isLoading: action.payload });
  }

  if (action.type === SET_CURRENT_PAGE) {
    return Object.assign({}, state, { currentPage: action.payload });
  }

  if (action.type === SET_TOTAL_PAGES) {
    return Object.assign({}, state, { totalPages: action.payload });
  }

  return state;
};

export default RootReducer;
