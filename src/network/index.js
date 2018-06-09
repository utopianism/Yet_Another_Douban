
// @flow

import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';

async function getMovieDetail(itemId: string) {
  try {
    const respond = await axios.get(`https://api.douban.com/v2/movie/subject/${itemId}?apikey=0b2bdeda43b5688921839c8ecb20399b&city=%E5%8C%97%E4%BA%AC&client=&udid=`);
    const { data } = respond;
    const uri = data.images.small;
    const {
      title,
      original_title,
      year,
      pubdates,
      countries,
      genres,
      durations,
      rating,
      tags,
      summary,
      directors,
      photos,
      popular_comments,
      photos_count,
    } = data;

    const movieInfo = {
      title,
      durations: durations[0],
      pubdates: pubdates[0],
      countries,
      year,
      type: genres,
      originalTitle: original_title,
    };

    const { details } = rating;
    const ratingsCount = _.reduce(details, (a, c) => a + c, 0);
    const movieRating = { rating: rating.average, ratingsCount };

    const aCasts = data.casts.map(c =>
      ({
        imgURI: c.avatars.large,
        name: c.name,
        title: c.name_en,
      }));

    const aDirectors = directors.map(d =>
      ({
        imgURI: d.avatars.large,
        name: d.name,
        title: d.name_en,
      }));

    const casts = aCasts.concat(aDirectors);

    const comments = popular_comments.map((comment) => {
      return {
        rating: {
          value: comment.rating.value,
          usefulCount: comment.useful_count,
        },
        author: {
          avator: comment.author.avatar,
          name: comment.author.name,
        },
        content: comment.content,
        createdDate: moment(comment.created_at).fromNow(),
      };
    });

    const imgURLs = photos.map(p => p.thumb);

    return {
      movieRating,
      movieInfo,
      casts,
      comments,
      tags,
      imgURLs,
      summary,
      uri,
      photosCount: photos_count,
    };
  } catch (e) {
    throw e;
  }
}

export { getMovieDetail };
