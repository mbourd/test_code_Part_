import { combineReducers } from "redux";
import { REPLACE_LISTALLFILM } from "./actionType";

const initialStateListAllFilm = {
  listAllFilm: []
}

const listAllFilmReducer = (state = initialStateListAllFilm, action) => {
  switch (action.type) {
    case (REPLACE_LISTALLFILM):
      return action.value;
      break;

    default:
      break;
  }

  return state;
}

const rootReducer = combineReducers({
  listAllFilm: listAllFilmReducer
})

export default rootReducer;
