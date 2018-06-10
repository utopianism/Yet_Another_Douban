// @flow

import React from 'react';
import {
  View,
  Text,
  Dimensions,
} from 'react-native';
import type { MovieInfo } from '../types/TypeDefinition';
import { TopRatingButton } from './TopRatingButton';

const WIDTH = Dimensions.get('window').width;

type Props ={
  info: MovieInfo,
  index: number,
}

const MovieInfoView = (props: Props) => {
  const {
    containerStyle,
    textStyle,
    titleStyle,
    titleTextStyle,
  } = styles;

  const { info, index } = props;

  const {
    title,
    pubdates,
    originalTitle,
    durations,
  } = info;

  return (
    <View style={containerStyle}>
      <View style={titleStyle}>
        <Text style={titleTextStyle} numberOfLines={1}>{title}</Text>
      </View>
      <TopRatingButton title={`No.${index}`} subTitle="豆瓣Top250" />
      <Text style={textStyle} numberOfLines={1}>{desc(info)}</Text>
      {originalTitle && <Text style={textStyle} numberOfLines={1}>{`原名：${originalTitle}`}</Text>}
      <Text style={textStyle} numberOfLines={1}>{`上映时间：${pubdates}`}</Text>
      <Text style={textStyle} numberOfLines={1}>{`片长：${durations}`}</Text>
    </View>
  );
};

const styles = {
  containerStyle: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: 120,
    width: WIDTH * 0.6,
    backgroundColor: '#fff',
  },
  titleStyle: {
    height: 30,
    width: WIDTH * 0.6,
    backgroundColor: '#fff',
  },
  titleTextStyle: {
    fontSize: 22,
    fontWeight: '500',
  },
  textStyle: {
    textAlign: 'left',
    fontSize: 12,
    color: 'grey',
  },
};


function desc(data: MovieInfo): string {
  const reducer = (a, c) => `${a} / ${c}`;
  return `${data.year}${data.countries.reduce(reducer, '')}${data.type.reduce(reducer, '')}`;
}

export { MovieInfoView };
