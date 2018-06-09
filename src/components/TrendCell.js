
// @flow

import React from 'react';
import {
  View,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import { Transition } from 'react-navigation-fluid-transitions';

import { AsyncImage } from './AsyncImage';
import { images } from '../images';
import { RatingStar } from './RatingStar';
import { constants } from '../config';
import type { Movie } from '../types/TypeDefinition';

type Props = {
  onPress?: () => void,
  data: Movie,
  index: number,
};

const { width } = Dimensions.get('window');
const Width = width;


const TrendCell = (props: Props) => {
  const {
    rowStyle,
    containerStyle,
    coverStyle,
    rightContainerStyle,
    titleViewStyle,
    titleTextStyle,
    titleYearStyle,
    starViewStyle,
    descViewStyle,
    descTextStyle,
  } = styles;

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={rowStyle}
    >
      <View style={containerStyle} >
        <Transition shared={`image${props.index}`}>
          <AsyncImage
            style={coverStyle}
            placeholderSource={images.placeholder}
            source={{ uri: props.data.cover }}
            placeholderColor="#b3e5fc"
          />
        </Transition>

        <View style={rightContainerStyle} >
          <View style={titleViewStyle} >
            <Text style={titleTextStyle} >
              {props.data.title}
            </Text>
            <Text style={titleYearStyle} >
              {` (${props.data.year})`}
            </Text>
          </View>

          <View style={starViewStyle}>
            <RatingStar rating={props.data.rate} size={15} />
            <View >
              <Text
                style={{
                marginLeft: 3,
                color: 'grey',
                textAlign: 'center',
              }}
              >
                {props.data.rate}
              </Text>
            </View>
          </View>

          <View style={descViewStyle} >
            <Text
              style={descTextStyle}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {desc(props.data)}
            </Text>
          </View>

        </View>
      </View>
    </TouchableOpacity>
  );
};

function desc(data: Movie): string {
  const reducer = (a, c) => `${a} ${c}`;
  return `${data.year} / ${data.type.reduce(reducer, '')} \
  / ${data.directors.reduce(reducer, '')} / ${data.casts.reduce(reducer, '')}`;
}

const styles = {
  rowStyle: {
    flex: 1,
    height: 162,
    width: Width,
    paddingLeft: 10,
  },
  containerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  coverStyle: {
    height: 140,
    width: 140 * constants.coverImageRatio,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  rightContainerStyle: {
    width: Width - 100 - 30,
    height: 162,
    marginLeft: 10,
    flexDirection: 'column',
  },
  titleViewStyle: {
    width: Width - 100 - 30,
    height: 35,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleTextStyle: {
    fontSize: 17,
    fontWeight: '500',
    marginLeft: 3,
  },
  titleYearStyle: {
    fontSize: 16,
    fontWeight: '400',
    color: 'grey',
  },
  starViewStyle: {
    height: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  descViewStyle: {
    width: Width - 100 - 30,
    height: 45,
    marginTop: 5,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  descTextStyle: {
    marginLeft: 3,
    color: 'grey',
    textAlign: 'justify',
    lineHeight: 20,
  },
};

export { TrendCell };
