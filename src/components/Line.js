// @flow
import React from 'react';
import { View } from 'react-native';
import type { Style } from '../types/TypeDefinition';

type Props = {
  style?: Style,
};

const Line = (props: Props) => {
  return (
    <View style={[{
      height: 0.5,
      backgroundColor: 'lightgray',
      marginLeft: 10,
    }, props.style]}
    />
  );
};

export { Line };
