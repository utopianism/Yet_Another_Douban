// @flow

import React from 'react';
import {
  View,
  Text,
  Dimensions,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import { AsyncImage } from './AsyncImage';
import { images } from '../images';
import { RatingStar } from './RatingStar';
import type { Comment } from '../types/TypeDefinition';
import { colors } from '../config';

const thumbsUp = () => (
  <Feather
    name="thumbs-up"
    size={20}
    color="lightgrey"
    style={{ backgroundColor: 'transparent' }}
  />
);

const WIDTH = Dimensions.get('window').width;

type Props = {
  comment: Comment
}

const CommentCell = (props: Props) => {
  const {
    containerStyle,
    imageStyle,
    headerStyle,
    authorStyle,
    nameViewStyle,
    nameStyle,
    voteStyle,
    textViewStyle,
    textContentStyle,
  } = styles;
  const {
    author,
    content,
    createdDate,
    rating,
  } = props.comment;
  return (
    <View style={containerStyle} >
      <View style={headerStyle} >
        <View style={authorStyle}>
          <AsyncImage
            style={imageStyle}
            placeholderSource={images.placeholder}
            source={{ uri: author.avator }}
            resizeMode="cover"
          />
          <View style={nameViewStyle}>
            <Text numberOfLines={1} style={nameStyle}>{author.name}</Text>
            <RatingStar rating={rating.value * 2} size={15} />
          </View>
        </View>
        <View style={voteStyle}>
          {thumbsUp()}
          <View>
            <Text style={{ color: 'lightgrey', paddingLeft: 3 }}>{rating.usefulCount}</Text>
          </View>
        </View>
      </View>
      <View style={textViewStyle}>
        <Text numberOfLines={0} style={textContentStyle}>{content}</Text>
        <Text style={{ color: 'grey', paddingTop: 3 }}>{createdDate}</Text>
      </View>
    </View>
  );
};

const styles = {
  containerStyle: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 15,
    paddingTop: 10,
  },
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    width: WIDTH - 30,
  },
  authorStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameViewStyle: {
    flexDirection: 'row',
    width: WIDTH - 70 - 100,
  },
  nameStyle: {
    textAlign: 'left',
    fontSize: 15,
    fontWeight: '400',
    paddingLeft: 10,
    paddingRight: 10,
  },
  imageStyle: {
    height: 40,
    width: 40,
    borderRadius: 40 * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  voteStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  textViewStyle: {
    paddingLeft: 50,
    paddingTop: 0,
  },
  textContentStyle: {
    color: colors.fontblack,
    lineHeight: 20,
    fontSize: 15,
  },
};

export { CommentCell };
