import { ADD_CHARACTER, SET_CURRENT_CHARACTER, CLEAR_CHARACTERS, ADD_SPACESHIP, SET_CURRENT_SPACESHIP, CLEAR_SPACESHIPS, SET_IS_LOADING, SET_CURRENT_PAGE, SET_TOTAL_PAGES } from "../constants/ActionTypes";
import { Character, Spaceship } from "../decoders/Api";

export const addCharacter = (payload: Character) => {
  return { type: ADD_CHARACTER, payload };
};

export const setCurrentCharacter = (payload: Character) => {
  return { type: SET_CURRENT_CHARACTER, payload };
};

export const clearCharacters = () => {
  return { type: CLEAR_CHARACTERS };
}

export const addSpaceship = (payload: Spaceship) => {
  return { type: ADD_SPACESHIP, payload };
}

export const setCurrentSpaceship = (payload: Spaceship) => {
  return { type: SET_CURRENT_SPACESHIP, payload };
};

export const clearSpaceships = () => {
  return { type: CLEAR_SPACESHIPS };
}

export const setIsLoading = (payload: boolean) => {
  return { type: SET_IS_LOADING, payload };
}

export const setCurrentPage = (payload: number) => {
  return { type: SET_CURRENT_PAGE, payload };
}

export const setTotalPages = (payload: number) => {
  return { type: SET_TOTAL_PAGES, payload };
}
