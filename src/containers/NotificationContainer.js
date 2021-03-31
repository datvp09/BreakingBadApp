import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {hideNotification} from '@redux/actions';
import {CustomIcon, NotificationModal} from '@components';

const NotificationContainer = () => {
  const {
    isShowingNotification,
    notiMessage,
    notiMessageStyle,
    notiTitle,
    notiTitleStyle,
    notiType,
    showNotiCallback,
    functionComponent,
    showCloseButton,
    isAllowDismiss,
    onModalWillShow,
    onModalShow,
  } = useSelector(state => state.data);
  const dispatch = useDispatch();
  const iconName = notiType == 'success' ? 'success-2' : 'error-cross';
  const onDismiss = () => {
    dispatch(hideNotification());
    if (showNotiCallback) {
      showNotiCallback();
    }
  };
  const props = {
    isVisible: isShowingNotification,
    title: notiTitle,
    titleStyle: notiTitleStyle,
    description: notiMessage,
    descriptionStyle: notiMessageStyle,
    showCloseButton,
    isAllowDismiss,
    onDismiss,
    onModalWillShow,
    onModalShow,
  };
  if (notiType) {
    props.iconComponent = <CustomIcon name={iconName} size={75} />;
  } else {
    props.functionComponent = functionComponent;
  }

  return <NotificationModal {...props} />;
};

export default NotificationContainer;
