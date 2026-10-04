import { api } from './api';

export const yearRangeParams = {
  page: 1,
  primary_release_date_gte: '',
  primary_release_date_lte: '',
  with_genres: '',
};

export const getFilmsByYearRange = async () => {
  const { data } = await api.get('/discover/movie', {
    params: {
      ...yearRangeParams,
      sort_by: 'primary_release_date.desc',
    },
  });

  return data;
};
