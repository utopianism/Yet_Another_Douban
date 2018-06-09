// @flow

import type { Action } from '../types/Action';
import type { Movie } from '../types/TypeDefinition';


type State = {
  data: Array<Movie> | [],
  isFetching: boolean,
  isLoadMore: boolean,
  error: boolean,
  isNoMoreData: boolean,
}

const initialState = {
  data: [],
  isFetching: true,
  isLoadMore: false,
  error: false,
  isNoMoreData: false,
};

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'FETCH_MOVIE_TRENDS':
      return {
        ...state,
        isFetching: true,
        isLoadMore: false,
        error: false,
      };
    case 'FETCH_MOVIE_TRENDS_SUCCESS':
      return {
        ...state,
        isFetching: false,
        data: action.payload,
      };
    case 'FETCH_MOVIE_TRENDS_FAIL':
      return {
        ...state,
        isFetching: false,
        error: true,
      };

    case 'FETCH_MORE_MOVIE_TRENDS':
      return {
        ...state,
        isLoadMore: true,
      };
    case 'FETCH_MORE_MOVIE_TRENDS_SUCCESS':
      return {
        ...state,
        isLoadMore: false,
        data: state.data.concat(action.payload),
      };
    case 'FETCH_MORE_MOVIE_TRENDS_FAIL':
      return {
        ...state,
        isLoadMore: false,
        isNoMoreData: true,
      };

    default:
      return state;
  }
};
