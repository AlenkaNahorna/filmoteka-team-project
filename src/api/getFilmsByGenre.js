import { api } from './api';

export const genreParams = {
  page: 1,
  with_genres: '',
};

export const getFilmsByGenre = async () => {
  const { data } = await api.get('/discover/movie', {
    params: {
      ...genreParams,
      sort_by: 'popularity.desc',
    },
  });

  return data;
};
