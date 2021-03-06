import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {CustomIcon, CustomModal} from '@components';

const NotificationModal = ({
  isVisible = false,
  onDismiss = () => {},
  onModalWillShow = () => {},
  onModalShow = () => {},
  isAllowDismiss = true,
  iconComponent = null,
  functionComponent = null,
  title = '',
  titleStyle = {},
  description = '',
  descriptionStyle = {},
  showCloseButton = true,
}) => (
  <CustomModal
    isVisible={isVisible}
    style={styles.modal}
    isAllowDismiss={isAllowDismiss}
    onModalWillShow={onModalWillShow}
    onModalShow={onModalShow}
    onDismiss={onDismiss}>
    <View style={styles.container}>
      {iconComponent}
      <Text
        style={[
          styles.notiTitle,
          {paddingTop: !!iconComponent ? 20 : 0},
          titleStyle,
        ]}>
        {title}
      </Text>
      {typeof description == 'string' ? (
        <Text style={[styles.notiDescription, descriptionStyle]}>
          {description}
        </Text>
      ) : (
        description
      )}
      {showCloseButton && (
        <TouchableOpacity onPress={onDismiss} style={styles.closeButton}>
          <CustomIcon name={'close'} width={16} height={16} color={'white'} />
        </TouchableOpacity>
      )}
      {functionComponent}
    </View>
  </CustomModal>
);

const styles = StyleSheet.create({
  modal: {marginHorizontal: 25},
  container: {
    backgroundColor: 'white',
    paddingVertical: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notiTitle: {
    fontSize: 30,
    paddingBottom: 15,
  },
  notiDescription: {
    fontSize: 16,
    paddingBottom: 5,
    paddingHorizontal: 15,
    lineHeight: 25,
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: -18,
    right: -18,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    marginBottom: 25,
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NotificationModal;
