// @flow

import FetchDataReducer from './FetchDataReducer';
import MovieTrendsReducer from './MovieTrendsReducer';

const reducers = {
  fetchDataReducer: FetchDataReducer,
  movieTrendsReducer: MovieTrendsReducer,
};

export type Reducers = typeof reducers;

export default reducers;
