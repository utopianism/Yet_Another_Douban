// @flow

import React from 'react';
import {
  TouchableOpacity,
  Text,
} from 'react-native';

import { constants, colors } from '../config';
import type { Style } from '../types/TypeDefinition';


type Props = {
  onPress?: () => void,
  count?: string,
  title: string,
  style?: Style,
} ;


const ImageListFooter = (props: Props) => {
  const {
    containerStyle,
    textStyle,
  } = styles;
  const {
    onPress,
    count,
    title,
    style,
  } = props;
  return (
    <TouchableOpacity style={[containerStyle, style]} onPress={onPress}>
      <Text style={textStyle}>{title}</Text>
      <Text style={textStyle}>——</Text>
      <Text style={textStyle}>{count}</Text>
    </TouchableOpacity>
  );
};

const styles = {
  containerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
    marginRight: 15,
    height: 100,
    width: 100 * constants.coverImageRatio,
    borderRadius: 6,
    backgroundColor: colors.placeholder,
  },
  textStyle: {
    color: colors.fontgrey,
  },
};

export { ImageListFooter };
