import React from 'react';
import {View, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import Close from '@assets/icons/close-icon';
import Close2 from '@assets/icons/close-icon-2';

const getIcon = (name, size, width, height, color) => {
  const map = new Map([
    ['close', Close],
    ['close-2', Close2],
  ]);

  const IconName = map.get(name);

  if (!IconName) {
    return null;
  }

  return (
    <IconName
      width={size || width || 24}
      height={size || height || 24}
      fill={color || 'none'}
      fillRule={'evenodd'}
    />
  );
};

const CustomIcon = ({
  name,
  size,
  width,
  height,
  color,
  style,
  enableTouch = false,
  touchWithoutFeedback = false,
  onPress,
}) => {
  const Touch = touchWithoutFeedback
    ? TouchableWithoutFeedback
    : TouchableOpacity;
  const icon = (
    <View style={style}>{getIcon(name, size, width, height, color)}</View>
  );

  if (!enableTouch) {
    return icon;
  }

  return <Touch onPress={onPress}>{icon}</Touch>;
};

export default CustomIcon;
