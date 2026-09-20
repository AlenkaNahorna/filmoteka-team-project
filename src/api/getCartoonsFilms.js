import { api } from './api';

export const cartoonsParams = {
  page: 1,
  with_genres: 16,
};

export const getCartoonsFilms = async () => {
  try {
    const { data } = await api.get('/discover/movie', {
      params: cartoonsParams,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
