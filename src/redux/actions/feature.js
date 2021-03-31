import {actionTypes, endpointConstants, methods} from '@core/config';

export const getCharacters = (bodyParams = {}, onSuccess, onFailure) => ({
  type: actionTypes.GET_LIST_DATA,
  endpoint: endpointConstants.GET_LIST_EP,
  method: methods.GET,
  bodyParams,
  onSuccess,
  onFailure,
});

export const getQuotes = (bodyParams = {}, onSuccess, onFailure) => ({
  type: actionTypes.GET_QUOTES_DATA,
  endpoint: endpointConstants.GET_QUOTES_EP,
  method: methods.GET,
  bodyParams,
  onSuccess,
  onFailure,
});

export const setCharacterList = payload => ({
  type: actionTypes.SET_LIST_DATA,
  payload,
});

export const setQuoteList = payload => ({
  type: actionTypes.SET_QUOTE_DATA,
  payload,
});

export const setCommentList = payload => ({
  type: actionTypes.SET_COMMENT_DATA,
  payload,
});
