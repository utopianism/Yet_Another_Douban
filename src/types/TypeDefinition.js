// @flow

export type Style =
  | { [key: string]: any }
  | number
  | false
  | null
  | void
  | Array<Style>;

export type Movie = {
  id: string,
  cover: string,
  title: string,
  year: number,
  rate: number,
  type: Array<string>,
  directors: Array<string>,
  casts: Array<string>,
};

export type MovieInfo = {
  title: string,
  originalTitle?: string,
  durations: string,
  pubdates: string,
  countries: Array<string>,
  year: string,
  type: Array<string>,
};

export type MovieRating = {
  rating: number,
  ratingsCount: number,
};


export type Cast = {
  name: string,
  title: string,
  imgURI: string,
};

export type Comment = {
  rating: {
    value: number,
    usefulCount: number,
  },
  author: {
    avator: string,
    name: string,
  },
  content: string,
  createdDate: string,
}
