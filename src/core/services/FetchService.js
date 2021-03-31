import axios from 'axios';
import {methods, actionTypes} from '@core/config';
// import {Storage, STORAGE_KEYS} from '@utils';
import {store} from '@redux/store';
import _ from 'lodash';
import {apiURL} from '@utils';

const {GET, POST, PUT, DELETE} = methods;
const {
  REQUEST,
  REQUEST_NOLOADING,
  REQUEST_SUCCESS,
  REQUEST_SUCCESS_NOLOADING,
  REQUEST_FAILURE,
} = actionTypes;

const fetchAPI = async (
  endpoint,
  method,
  bodyParameters = {},
  setLoading = true,
) => {
  if (setLoading) {
    store.dispatch({type: REQUEST});
  } else {
    store.dispatch({type: REQUEST_NOLOADING});
  }

  const url = apiURL.TEST + endpoint;
  // const token = await Storage.getItem(STORAGE_KEYS.USER_TOKEN);
  const headersAuthor = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  // if (token) {
  //   headersAuthor.Authorization = 'Bearer ' + token;
  // }

  console.log(
    `%cMETHOD_${method}`,
    'color:blue',
    url,
    headersAuthor,
    bodyParameters,
    setLoading,
  );

  let caller = null;

  switch (method) {
    case GET:
      caller = axios({method: GET, url, headers: headersAuthor});
      break;
    case POST:
      caller = axios({
        method: POST,
        url,
        headers: headersAuthor,
        data: JSON.stringify(bodyParameters),
      });
      break;
    case PUT:
      caller = axios({
        method: PUT,
        url,
        headers: headersAuthor,
        data: JSON.stringify(bodyParameters),
      });
      break;
    case DELETE:
      caller = axios({
        method: DELETE,
        url,
        headers: headersAuthor,
      });
      break;
    default:
      return false;
  }

  return caller
    .then(res => {
      console.log('%c--API response--', 'color:blue', res);
      if (setLoading) {
        store.dispatch({type: REQUEST_SUCCESS, payload: res.data});
      } else {
        store.dispatch({type: REQUEST_SUCCESS_NOLOADING, payload: res.data});
      }
      return res;
    })
    .catch(e => {
      console.log('%c--API response--', 'color:red', e, e.response);
      store.dispatch({type: REQUEST_FAILURE, payload: e.response});
      throw e;
    });
};

export default fetchAPI;
