// @flow

import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import { AsyncImage } from './AsyncImage';
import { constants } from '../config';
import { images } from '../images';
import type { Cast } from '../types/TypeDefinition';


type Props = {
  onPress?: () => void,
} & Cast;


const CastCell = (props: Props) => {
  const {
    containerStyle,
    imageStyle,
    nameStyle,
    titleStyle,
  } = styles;
  const {
    onPress,
    name,
    title,
    imgURI,
  } = props;
  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
    >
      <AsyncImage
        style={imageStyle}
        placeholderSource={images.placeholder}
        source={{ uri: imgURI }}
        resizeMode="cover"
      />
      <Text
        style={nameStyle}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {name}
      </Text>

      <Text
        style={titleStyle}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  containerStyle: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  imageStyle: {
    height: 100,
    width: 100 * constants.coverImageRatio,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  nameStyle: {
    textAlign: 'left',
    fontSize: 12,
    color: 'black',
    width: 100 * constants.coverImageRatio,
    paddingTop: 8,
  },
  titleStyle: {
    textAlign: 'left',
    fontSize: 11,
    color: 'grey',
    backgroundColor: '#fff',
    width: 100 * constants.coverImageRatio,
    paddingTop: 3,
  },
};

export { CastCell };
