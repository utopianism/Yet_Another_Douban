// @flow

import type { dataType } from '../reducers/FetchDataReducer';
import type { Movie } from './TypeDefinition';

export type Action =
{ type: 'FETCH_DATA_START' } |
{ type: 'FETCH_DATA_SUCCESS', payload: dataType } |
{ type: 'FETCH_DATA_FAIL' } |

{ type: 'FETCH_MOVIE_TRENDS' } |
{ type: 'FETCH_MOVIE_TRENDS_SUCCESS', payload: [Movie] } |
{ type: 'FETCH_MOVIE_TRENDS_FAIL' } |

{ type: 'FETCH_MORE_MOVIE_TRENDS' } |
{ type: 'FETCH_MORE_MOVIE_TRENDS_SUCCESS', payload: [Movie] } |
{ type: 'FETCH_MORE_MOVIE_TRENDS_FAIL' };

