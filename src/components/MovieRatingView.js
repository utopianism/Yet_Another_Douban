// @flow

import React from 'react';
import { View, Text } from 'react-native';
import { RatingStar } from './RatingStar';
import { colors } from '../config';
import type { MovieRating } from '../types/TypeDefinition';

type Props = {
  rating: MovieRating;
};

const MovieRatingView = (props: Props) => {
  const { containerStyle, textStyle } = styles;
  const { rating, ratingsCount } = props.rating;
  return (
    <View style={containerStyle} >
      <Text style={textStyle}>豆瓣评分</Text>
      <Text style={{ fontSize: 22, fontWeight: '500' }}>{rating}</Text>
      <RatingStar rating={rating} size={10} />
      <Text style={textStyle}>{`${ratingsCount}人`}</Text>
    </View>
  );
};

const styles = {
  containerStyle: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 90,
    width: 90,
    backgroundColor: '#fff',
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 1, height: 2 },
    elevation: 2,
  },
  textStyle: {
    fontSize: 12,
    textAlign: 'center',
    color: colors.fontgrey,
  },
};

export { MovieRatingView };
