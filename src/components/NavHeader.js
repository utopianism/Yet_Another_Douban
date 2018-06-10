
// @flow

// TODO: 或许这里需要重构下

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { constants } from '../config';
import type { Style } from '../types/TypeDefinition';

type Props = {
  style?: Style,
  onPressLeft?: () => void,
  title?: string,
  hideBorder?: boolean,
  textColor?: string,
}

const NavHeader = (props: Props) => {
  const {
    style,
    onPressLeft,
    title,
    hideBorder,
    textColor,
  } = props;
  const border = {
    borderBottomWidth: 0.5,
    borderBottomColor: 'lightgray',
  };
  const color = textColor || '#000';
  const {
    narViewStyle,
    navLeftViewStyle,
    leftTitleStyle,
    navCentreViewStyle,
    titleStyle,
    navRightViewStyle,
  } = styles;
  return (
    <View style={[narViewStyle, style, (hideBorder || border)]}>
      <View style={navLeftViewStyle}>
        {
            onPressLeft !== undefined &&
            <TouchableOpacity
              style={leftTitleStyle}
              onPress={onPressLeft}
            >
              <Icon
                name="ios-arrow-back"
                size={35}
                color={color}
                style={{ backgroundColor: 'transparent' }}
              />
            </TouchableOpacity>
          }
      </View>


      <View style={navCentreViewStyle}>
        <Text
          style={[titleStyle, { color }]}
          ellipsizeMode="tail"
          numberOfLines={1}
        >
          {title}
        </Text>
      </View>

      <View style={navRightViewStyle} />

    </View>
  );
};

const styles = StyleSheet.create({
  narViewStyle: {
    width: constants.screenWidth,
    height: constants.navHeight,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navLeftViewStyle: {
    flex: 2.5,
    height: constants.navHeight - constants.navTop,
    marginTop: constants.navTop,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  navCentreViewStyle: {
    flex: 5,
    height: constants.navHeight - constants.navTop,
    marginTop: constants.navTop,
    // backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navRightViewStyle: {
    flex: 2.5,
    height: constants.navHeight - constants.navTop,
    marginTop: constants.navTop,
    // backgroundColor: 'yellow',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  leftTitleStyle: {
    height: constants.navHeight - constants.navTop,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    width: 48,
  },
  titleStyle: {
    fontSize: 18,
    width: 200,
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
});

export { NavHeader };
