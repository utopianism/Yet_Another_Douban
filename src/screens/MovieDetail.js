// @flow

import React, { Component } from 'react';
import {
  StatusBar,
  NativeModules,
  ScrollView,
  View,
  Image,
  Text,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { Transition } from 'react-navigation-fluid-transitions';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  Container,
  TagsView,
  MovieSummary,
  CastsList,
  FilmPhotos,
  Comments,
  MovieInfoView,
  MovieRatingView,
  BasicText,
} from '../components';
import type {
  MovieRating,
  MovieInfo,
  Cast,
  Comment,
} from '../types/TypeDefinition';
import { constants } from '../config';
import { getMovieDetail } from '../network';

const { NativeInterface } = NativeModules;

const coverHeight = constants.screenHeight / 2.3;


type Props = {};

type State = {
  backgroundColor: string,
  movieRating: MovieRating,
  movieInfo: MovieInfo,
  casts: Array<Cast>,
  comments: Array<Comment>,
  tags: Array<string>,
  imgURLs: Array<string>,
  summary: string,
  scrollY: any,
  headerTitle: string,
  photosCount: number,
};

const initData = {
  movieRating: { rating: 0, ratingsCount: 0 },
  movieInfo: {
    title: '',
    durations: '',
    pubdates: '',
    countries: [''],
    year: '',
    type: [''],
  },
  casts: [
    { name: 'placeholder', title: 'placeholder', imgURI: 'https://facebook.github.io/react-native/docs/assets/favicon.png' },
  ],
  comments: [{
    rating: {
      value: 1.6,
      usefulCount: 111,
    },
    author: {
      avator: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
      name: 'placeholder text',
    },
    content: 'placeholder text',
    createdDate: 'placeholder text',
  }],
  tags: [''],
  imgURLs: [
    'https://facebook.github.io/react-native/docs/assets/favicon.png',
  ],
  summary: '',
  photosCount: 0,
};

const arrow = (
  <Icon
    name="ios-arrow-back"
    size={35}
    color="#fff"
    style={{ backgroundColor: 'transparent' }}
  />
);

const navTitle = '电影';

class MovieDetail extends Component<Props, State> {
  state: State

  constructor(props: Props) {
    super(props);
    this.state = {
      backgroundColor: 'lightgrey',
      ...initData,
      scrollY: new Animated.Value(0),
      headerTitle: navTitle,
    };
  }

  componentDidMount() {
    // $FlowFixMe
    const item = this.props.navigation.getParam('item', 'NO-ID');
    getMovieDetail(item.id).then((respond) => {
      const {
        movieRating,
        movieInfo,
        casts,
        comments,
        tags,
        imgURLs,
        summary,
        uri,
        photosCount,
      } = respond;
      this.setState({
        movieRating,
        movieInfo,
        casts,
        comments,
        tags,
        imgURLs,
        summary,
        photosCount,
      });
      NativeInterface.downLoadImage(uri)
        .then((imgURL) => {
          NativeInterface.imageColors(imgURL)
            .then((colours) => {
              this.setState({ backgroundColor: colours.background });
            });
        });
    })
      .catch(e => console.warn(e));
  }

  render() {
    const {
      imageStyle,
      movieStyle,
      coverStyle,
      headerStyle,
      headerLeftStyle,
      headerCenterStyle,
      headerTitleStyle,
      commentTextStyle,
    } = styles;
    const {
      backgroundColor,
      movieRating,
      movieInfo,
      casts,
      comments,
      summary,
      imgURLs,
      tags,
      headerTitle,
      photosCount,
    } = this.state;
    const bgColor = this.state.scrollY.interpolate({
      inputRange: [0, coverHeight],
      outputRange: ['transparent', backgroundColor],
      extrapolate: 'clamp',
    });
    // $FlowFixMe
    const { index } = this.props.navigation.state.params;
    // $FlowFixMe
    const { cover } = this.props.navigation.state.params.item;
    return (

      <Container>
        <StatusBar barStyle="light-content" />

        <Animated.View style={[headerStyle, { backgroundColor: bgColor }]} >
          <TouchableOpacity
            style={headerLeftStyle}
            onPress={() => {
            // $FlowFixMe
            return this.props.navigation.goBack();
          }}
          >
            {arrow}
          </TouchableOpacity>

          <View style={headerCenterStyle}>
            <Text style={headerTitleStyle}>{headerTitle} </Text>
          </View>

          <View style={{ height: 44, width: 44 }} />
        </Animated.View>
        <ScrollView
          style={{ flex: 1 }}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            {
             listener: (event) => {
                          const scrollY = event.nativeEvent.contentOffset.y;
                          if (scrollY > coverHeight + 30) {
                            if (this.state.headerTitle !== movieInfo.title) {
                                this.setState({ headerTitle: movieInfo.title });
                            }
                          } else if (this.state.headerTitle !== navTitle) {
                              this.setState({ headerTitle: navTitle });
                          }
                        },
            },
        )}
        >
          <View style={[coverStyle, { backgroundColor }]}>
            <Transition shared={`image${index}`}>
              <Image
                source={{ uri: cover }}
                style={imageStyle}
              />
            </Transition>
          </View>

          <View style={movieStyle}>
            <MovieInfoView info={movieInfo} index={parseInt(index, 10) + 1} />
            <MovieRatingView rating={movieRating} />
          </View>

          <BasicText style={{ paddingTop: 0 }}>所属频道</BasicText>
          <TagsView tags={tags} />

          <BasicText>剧情简介</BasicText>
          <MovieSummary text={summary} numberOfLines={4} />

          <BasicText>影人</BasicText>
          <CastsList casts={casts} />

          <BasicText>剧照</BasicText>
          <FilmPhotos imgURLs={imgURLs} photosCount={photosCount} />

          <BasicText style={commentTextStyle}>短评</BasicText>
          <Comments comments={comments} />

        </ScrollView>
      </Container>

    );
  }
}

const styles = {
  headerStyle: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    zIndex: 1,
    height: constants.navHeight,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: 0,
    paddingRight: 15,
    paddingLeft: 15,
  },
  headerLeftStyle: {
    height: 44,
    width: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenterStyle: {
    height: 44,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleStyle: {
    fontSize: 18,
    width: 200,
    textAlign: 'center',
    color: '#fff',
  },
  coverStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: coverHeight + constants.navHeight,
    width: constants.screenWidth,
  },
  imageStyle: {
    width: 260 * constants.coverImageRatio,
    height: 260,
    position: 'absolute',
    resizeMode: 'contain',
    bottom: 30,
  },
  movieStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    height: 150,
    width: constants.screenWidth,
    padding: 15,
  },
  commentTextStyle: {
    color: '#000',
    fontSize: 18,
    fontWeight: '400',
    paddingBottom: 0,
    paddingTop: 25,
  },
};

export default MovieDetail;
