// @flow

import React from 'react';
import { TouchableOpacity } from 'react-native';

import { AsyncImage } from './AsyncImage';
import { images } from '../images';

type Props = {
  onPress?: () => void,
  imgURI: string,
};

const FilmPhotoCell = (props: Props) => {
  const {
    containerStyle,
    imageStyle,
  } = styles;
  const {
    onPress,
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
    height: 140,
    width: 140 * 1.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export { FilmPhotoCell };
