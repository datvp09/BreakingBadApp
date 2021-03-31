import {actionTypes} from '@core/config';

const initialState = {
  paynow: [],
  error: {},
  isFetching: false,
  isShowingNotification: false,
  notiType: '',
  notiTitle: '',
  notiTitleStyle: {},
  notiMessage: '',
  notiMessageStyle: {},
  isAllowDismiss: true,
  showNotiCallback: () => {},
  onModalWillShow: () => {},
  onModalShow: () => {},
  functionComponent: null,
};

export default function paynowReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case actionTypes.REQUEST_NOLOADING:
      return state;
    case actionTypes.REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: {},
      };
    case actionTypes.REQUEST_SUCCESS_NOLOADING:
      return {
        ...state,
        error: {},
      };
    case actionTypes.REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case actionTypes.SHOW_NOTIFICATION:
      const {
        notiMessage,
        notiMessageStyle,
        showNotiCallback,
        onModalWillShow,
        onModalShow,
        notiTitle,
        notiTitleStyle,
        notiType,
        functionComponent,
        showCloseButton,
        isAllowDismiss,
      } = action.payload;

      return {
        ...state,
        isShowingNotification: true,
        notiMessage,
        notiMessageStyle,
        showNotiCallback,
        onModalWillShow,
        onModalShow,
        notiTitle,
        notiTitleStyle,
        notiType,
        functionComponent,
        showCloseButton,
        isAllowDismiss,
      };
    case actionTypes.HIDE_NOTIFICATION:
      return {
        ...state,
        isShowingNotification: false,
      };
    case actionTypes.SHOW_SPINNER:
      return {
        ...state,
        isFetching: true,
      };
    case actionTypes.HIDE_SPINNER:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
}
