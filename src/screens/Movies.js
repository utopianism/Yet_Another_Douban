// @flow

import React, { Component } from 'react';
import {
  View,
  FlatList,
} from 'react-native';
import { connect } from 'react-redux';

import { fetchMovieTrendsData, fetchMoreMovieTrendsData } from '../actions';
import {
  Container,
  Line,
  TrendCell,
  ErrorView,
  Spinner,
  EmptyView,
  NavHeader,
} from '../components';

import type { State } from '../types/State';
import type { Movie } from '../types/TypeDefinition';


type Props = {
  fetchMovieTrendsData: typeof fetchMovieTrendsData,
  fetchMoreMovieTrendsData: typeof fetchMoreMovieTrendsData,
  moviesData: [Movie] | [],
  isFetching: boolean,
  isLoadMore: boolean,
  error: boolean,
  isNoMoreData: boolean,
}

class Movies extends Component<Props> {
  componentDidMount() {
    this.props.fetchMovieTrendsData();
  }

  _renderItem({ item, index }) {
    return (
      <TrendCell
        index={index}
        data={item}
        // $FlowFixMe
        onPress={() => this.props.navigation.navigate('MovieDetail', { item, index })}
      />
    );
  }

  render() {
    const {
      moviesData,
      isFetching,
      error,
      isLoadMore,
      isNoMoreData,
    } = this.props;
    return (
      <Container>
        <NavHeader title="TOP 250" />
        {isFetching && <Spinner />}
        {error && <ErrorView onPress={() => this.props.fetchMovieTrendsData()} />}
        <FlatList
          renderItem={row => this._renderItem(row)}
          data={moviesData}
          ItemSeparatorComponent={() => <Line style={{ marginLeft: 30 }} />}
          keyExtractor={(item, index) => `1${index}`}
          initialNumToRender={5}
          windowSize={3}
          onEndReachedThreshold={0.3}
          onEndReached={() => {
            if (isLoadMore === false && isNoMoreData === false) {
               this.props.fetchMoreMovieTrendsData(moviesData.length, 15);
            }
          }}
          ListFooterComponent={() => {
            if (isLoadMore) {
              return <Spinner />;
            } else if (isNoMoreData) {
              return <EmptyView />;
            }
            return <View />;
          }}
        />

      </Container>
    );
  }
}

const mapStateToProps = ({ movieTrendsReducer }: State) => {
  const {
    data,
    isFetching,
    error,
    isLoadMore,
    isNoMoreData,
  } = movieTrendsReducer;
  return {
    moviesData: data,
    isFetching,
    error,
    isLoadMore,
    isNoMoreData,
  };
};

export default connect(mapStateToProps, { fetchMovieTrendsData, fetchMoreMovieTrendsData })(Movies);
