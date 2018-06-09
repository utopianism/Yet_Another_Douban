// @flow

import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { FluidNavigator } from 'react-navigation-fluid-transitions';

import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from './screens/Home';
import IntoNav from './screens/IntoNav';

import Movies from './screens/Movies';
import MovieDetail from './screens/MovieDetail';

import FetchData from './screens/FetchData';

import {
  navigationOptions,
  stackNavigatorConfig,
  tabBarConfig,
} from './config/reactNavigationConfig';

/**
 * tabBar 下面的 screens
 */
const HomeTab = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'Welcome',
      ...navigationOptions,
    },
  },
  Profile: {
    screen: IntoNav,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.name}'s Profile!`,
    }),
  },
}, { ...stackNavigatorConfig });

const MoviesTab = FluidNavigator({
  Movies: {
    screen: Movies,
    navigationOptions: {
      title: 'Movies',
      ...navigationOptions,
    },
  },
  MovieDetail: {
    screen: MovieDetail,
    navigationOptions: {
      title: '电影',
      ...navigationOptions,
    },
  },
}, { ...stackNavigatorConfig });

HomeTab.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

const MoreTab = createStackNavigator({
  FetchData: {
    screen: FetchData,
    navigationOptions: {
      title: 'Redux example',
      ...navigationOptions,
    },
  },
}, { ...stackNavigatorConfig });

/**
 * tabBar 定义
 */
const tab = createBottomTabNavigator({
  Movies: {
    screen: MoviesTab,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons name="movie" size={26} color={tintColor} />
      ),
      tabBarVisible: true,
    },
  },
  Home: {
    screen: HomeTab,
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => (
        <Ionicon name={focused ? 'ios-home' : 'ios-home-outline'} size={26} color={tintColor} />
      ),
    },

  },
  MoreTab: {
    screen: MoreTab,
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => (
        <Ionicon name={focused ? 'ios-cube' : 'ios-cube-outline'} size={26} color={tintColor} />
      ),
    },
  },
}, { ...tabBarConfig });

export default MoviesTab;
