import {actionTypes} from '@core/config';

const initialState = {
  characters: [],
  quotes: [],
  comments: [],
};

export default function listReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_LIST_DATA:
      return {...state, characters: action.payload};
    case actionTypes.SET_QUOTE_DATA:
      return {...state, quotes: action.payload};
    case actionTypes.SET_COMMENT_DATA:
      const {characterId, comment} = action.payload;
      const indexFound = state.comments.findIndex(
        x => x.characterId === characterId,
      );
      if (indexFound >= 0) {
        const newComments = [...state.comments];
        newComments[indexFound].comments.push(comment);
        return {...state, comments: newComments};
      } else {
        return {
          ...state,
          comments: [...state.comments, {characterId, comments: [comment]}],
        };
      }
    case actionTypes.CLEAR_DATA:
      return initialState;
    default:
      return state;
  }
}
