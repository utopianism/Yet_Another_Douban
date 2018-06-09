// @flow

import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../config';

type Props = {
  onPress?: () => void,
  title: string,
  uniqueKey: string,
};


const TagsButton = (props: Props) => {
  const { textStyle, containerStyle } = styles;
  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={props.onPress}
      key={`touch${props.uniqueKey}`}
    >
      <Text style={textStyle} key={`text${props.uniqueKey}`}>
        {props.title}
      </Text>
      <MaterialIcons
        name="keyboard-arrow-right"
        size={20}
        color={colors.primary}
        style={{ backgroundColor: 'transparent' }}
        key={`icon${props.uniqueKey}`}
      />
    </TouchableOpacity>
  );
};

const styles = {
  containerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.tags,
    opacity: 0.7,
    marginRight: 5,
    marginBottom: 15,
    borderRadius: 15,
    borderWidth: 0.3,
    borderColor: colors.primary,
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 16,
    color: colors.primary,
    padding: 4,
    paddingLeft: 10,
    paddingRight: 0,
  },
};

export { TagsButton };
