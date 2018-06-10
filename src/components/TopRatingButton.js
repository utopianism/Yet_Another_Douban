// @flow

import React from 'react';
import { View, Text } from 'react-native';

type Props = {
  title: string,
  subTitle?: string,
}

const TopRatingButton = (props: Props) => {
  const {
    containerStyle,
    leftViewStyle,
    rightViewStyle,
    textStyle,
  } = styles;
  return (
    <View style={containerStyle}>
      <View style={leftViewStyle}>
        <Text style={[textStyle, { color: 'rgb(173,113,52)' }]}>{props.title}</Text>
      </View>
      <View style={rightViewStyle}>
        <Text style={[textStyle, { color: 'rgb(254,197,119)' }]}>{props.subTitle}</Text>
      </View>
    </View>
  );
};

const styles = {
  containerStyle: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  leftViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(254,197,119)',
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
  },
  rightViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(81,79,77)',
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 14,
    padding: 3,
    paddingLeft: 10,
    paddingRight: 10,
  },
};

export { TopRatingButton };
