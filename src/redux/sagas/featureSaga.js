import {put, call, takeLatest, takeEvery, all} from 'redux-saga/effects';
import {actionTypes} from '@core/config';
import {fetchAPI} from '@core/services';
import {
  setUserInfo,
  setFeatureData,
  showNotification,
  getProductImages,
  showSpinner,
  hideSpinner,
  setCharacterList,
  setQuoteList,
} from '@redux/actions';
import _ from 'lodash';

function* onLoadFeatureSaga({
  type,
  endpoint,
  method,
  bodyParams,
  onSuccess,
  onFailure,
  setLoading = true,
}) {
  try {
    const res = yield call(() =>
      fetchAPI(endpoint, method, bodyParams, !!setLoading),
    );
    const {status, data} = res;
    console.log('res-x', res, ![200, 201, 202].includes(status));
    if (![200, 201, 202].includes(status)) {
      yield put(
        showNotification({
          notiTitle: 'Failed',
          notiMessage: 'Service Failed',
        }),
      );
      return;
    }

    switch (type) {
      case actionTypes.GET_LIST_DATA:
        yield put(setCharacterList(res.data));
        break;
      case actionTypes.GET_QUOTES_DATA:
        yield put(setQuoteList(res.data));
        break;
      default:
        break;
    }
  } catch (e) {
    console.log('featureSaga-fail', e, e.response);
    if (onFailure) {
      return onFailure(e.response?.data);
    }
    let notiMessage = 'Service failed';
    if (e.response?.data?.message) {
      notiMessage = e.response?.data?.message;
    }
    if (e.response?.status !== 401) {
      yield put(
        showNotification({
          notiTitle: 'Failed',
          notiMessage,
        }),
      );
    }
  }
}

function* watchOnLoadFeature() {
  yield takeLatest(actionTypes.GET_LIST_DATA, onLoadFeatureSaga);
  yield takeEvery(actionTypes.GET_QUOTES_DATA, onLoadFeatureSaga);
}

export default function* featureSaga() {
  yield all([watchOnLoadFeature()]);
}
