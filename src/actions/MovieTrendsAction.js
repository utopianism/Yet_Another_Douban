// @flow
import axios from 'axios';
import type { ThunkAction } from '../types/Store';
import type { Movie } from '../types/TypeDefinition';

const fetchMovieTrends = () => ({ type: 'FETCH_MOVIE_TRENDS' });
const fetchMovieTrendsSuccess = (data: [Movie]) => ({ type: 'FETCH_MOVIE_TRENDS_SUCCESS', payload: data });
const fetchMovieTrendsFail = () => ({ type: 'FETCH_MOVIE_TRENDS_FAIL' });

const fetchMoreMovieTrends = () => ({ type: 'FETCH_MORE_MOVIE_TRENDS' });
const fetchMoreMovieTrendsSuccess = (data: [Movie]) => ({ type: 'FETCH_MORE_MOVIE_TRENDS_SUCCESS', payload: data });
const fetchMoreMovieTrendsFail = () => ({ type: 'FETCH_MORE_MOVIE_TRENDS_FAIL' });


export function fetchMovieTrendsData(start: number = 0, count: number = 15): ThunkAction {
  return (dispatch) => {
    dispatch(fetchMovieTrends());
    getMovieTrends(start, count)
      .then(data => dispatch(fetchMovieTrendsSuccess(data)))
      .catch(() => dispatch(fetchMovieTrendsFail()));
  };
}

export function fetchMoreMovieTrendsData(start: number, count: number): ThunkAction {
  return (dispatch) => {
    dispatch(fetchMoreMovieTrends());
    getMovieTrends(start, count)
      .then(data => dispatch(fetchMoreMovieTrendsSuccess(data)))
      .catch(() => dispatch(fetchMoreMovieTrendsFail()));
  };
}

const getMovieTrends = (start: number, count: number): Promise<[Movie]> => {
  return new Promise((resolve, reject) => {
    axios.get(`https://api.douban.com/v2/movie/top250?apikey=0b2bdeda43b5688921839c8ecb20399b&city=%E5%8C%97%E4%BA%AC&start=${start}&count=${count}&client=&udid=`)
      .then(({ data }) => {
        if (data.subjects.length === 0) {
          reject(new Error('no more data'));
        } else {
          const movieTrendsData:[Movie] = data.subjects.map((movie) => {
            return {
              id: movie.id,
              cover: movie.images.large,
              title: movie.title,
              year: movie.year,
              rate: movie.rating.average,
              type: movie.genres,
              casts: movie.casts.map(cast => cast.name),
              directors: movie.directors.map(director => director.name),
            };
          });
          resolve(movieTrendsData);
        }
      })
      .catch((error) => {
        console.warn(error);
        reject(error);
      });
  });
};
