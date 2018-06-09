// @flow

import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../config';

const arrow = (name: string) => (
  <Ionicons
    name={name}
    size={25}
    color="lightgrey"
    style={{ backgroundColor: 'transparent' }}
  />
);

type Props = {
  text: string,
  numberOfLines: number,
};

type States = {
  showMore: boolean,
}

// 此处 豆瓣 app 里面的剧情介绍 `展开 `效果暂时没想到怎么实现
class MovieSummary extends Component<Props, States> {
  props: Props
  state: States

  constructor(props: Props) {
    super(props);
    this.state = {
      showMore: false,
    };
  }

  _showMore() {
    this.setState({ showMore: !this.state.showMore });
  }

  render() {
    const { textStyle, containerStyle, moreButtonStyle } = styles;
    return (
      <View
        style={containerStyle}
      >
        <Text
          style={textStyle}
          numberOfLines={this.state.showMore ? 0 : this.props.numberOfLines}
        >
          {this.props.text}
        </Text>
        <TouchableOpacity
          style={moreButtonStyle}
          onPress={() => this._showMore()}
        >
          {this.state.showMore ? arrow('ios-arrow-up') : arrow('ios-arrow-down')}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 15,
    paddingTop: 0,
    paddingBottom: 0,
  },
  textStyle: {
    textAlign: 'left',
    fontSize: 16,
    color: colors.fontblack,
    lineHeight: 20,
  },
  moreButtonStyle: {
    height: 25,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export { MovieSummary };
