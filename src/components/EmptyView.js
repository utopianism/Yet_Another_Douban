// @flow

import React from 'react';
import { View, Text } from 'react-native';

const EmptyView = () => {
  const { textStyle, emptyDataViewStyle } = styles;
  return (
    <View
      style={emptyDataViewStyle}
    >
      <Text style={textStyle}>
        {'没有更多数据了'}
      </Text>
    </View>
  );
};

const styles = {
  emptyDataViewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 18,
    color: 'grey',
  },
};

export { EmptyView };
