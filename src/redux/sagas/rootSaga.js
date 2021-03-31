import {all, fork} from 'redux-saga/effects';
import featureSaga from './featureSaga';

export default function* rootSaga() {
  yield all([fork(featureSaga)]);
}
