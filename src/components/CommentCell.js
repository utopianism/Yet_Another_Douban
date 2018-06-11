// @flow

import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import LottieView from 'lottie-react-native';

import { AsyncImage } from './AsyncImage';
import { images } from '../images';
import { RatingStar } from './RatingStar';
import type { Comment } from '../types/TypeDefinition';
import { colors } from '../config';

const WIDTH = Dimensions.get('window').width;

type Props = {
  comment: Comment,
}

type States = {
  progress: typeof Animated,
  count: number,
}

class CommentCell extends Component<Props, States> {
  props: Props;
  state: States;

  constructor(props: Props) {
    super(props);
    this.state = {
      progress: new Animated.Value(0),
      count: this.props.comment.rating.usefulCount,
    };
  }

  _onPress() {
    // 只能做下动画交互，没接口做真实的点赞请求...
    if (this.state.count === this.props.comment.rating.usefulCount) {
      this.setState({ count: this.state.count + 1 });
      // $FlowFixMe
      Animated.timing(this.state.progress, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
      }).start();
    }
  }

  render() {
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
    } = this.props.comment;

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
          <TouchableOpacity style={voteStyle} onPress={() => this._onPress()}>
            <LottieView
              style={{ width: 22, height: 22 }}
              source={images.thumbsUp}
              progress={this.state.progress}
            />
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: 'lightgrey' }}>{this.state.count}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={textViewStyle}>
          <Text numberOfLines={0} style={textContentStyle}>{content}</Text>
          <Text style={{ color: 'grey', paddingTop: 3 }}>{createdDate}</Text>
        </View>
      </View>
    );
  }
}


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
    alignItems: 'center',
    height: 22,
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
