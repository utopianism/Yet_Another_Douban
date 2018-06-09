
// @flow
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { constants } from '../config';

const NavHeader = ({
  style,
  onPressRight,
  onPressLeft,
  title,
  titleView,
  rightTitle,
  rightView,
  hideBorder,
  textColor,
}) => {
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
    rightTitleStyle,

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
        {titleView === undefined
          ?
            <Text
              style={[titleStyle, { color }]}
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              {title}
            </Text>
            : titleView}
      </View>

      <View style={navRightViewStyle}>
        <TouchableOpacity style={rightTitleStyle} onPress={onPressRight}>
          {
            rightTitle ?
              <Text style={{ fontSize: 17, color }}>
                {rightTitle}
              </Text>
            :
            rightView
        }
        </TouchableOpacity>
      </View>
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
  rightTitleStyle: {
    height: constants.navHeight - constants.navTop,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 12,
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
