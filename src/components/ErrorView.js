// @flow

import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

type Props = {
  onPress: () => {},
};

const ErrorView = (props: Props) => {
  const { textStyle, emptyDataViewStyle } = styles;
  return (
    <TouchableOpacity
      style={emptyDataViewStyle}
      onPress={props.onPress}
    >
      <Text style={textStyle}>
        {'出错啦, 请点击重试'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  emptyDataViewStyle: {
    flex: 1,
    height: 200,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 20,
    color: 'grey',
  },
};

export { ErrorView };
