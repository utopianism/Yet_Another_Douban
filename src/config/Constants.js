
// @flow
import { Dimensions } from 'react-native';

const X_HEIGHT = 812;
const HEIGHT = Dimensions.get('window').height;

const isIphoneX = HEIGHT === X_HEIGHT;
const navHeight = isIphoneX ? 84 : 64;
const navTop = isIphoneX ? 44 : 20;

const WIDTH = Dimensions.get('window').width;

const constants = {
  coverImageRatio: 3 / 4,
  navHeight,
  navTop,
  screenWidth: WIDTH,
  screenHeight: HEIGHT,
  isIphoneX,
};

export { constants };
