import { renderingPaginationMarkup } from '../pagination';
import { renderMovie } from './renderByKey';
import { showLoader, hideLoader } from '../loader';
import { dataCombine } from '../genreUtils';
import { getGenres } from '../../api/getGeners';
import { genreParams, getFilmsByGenre } from '../../api/getFilmsByGenre';
import { addToStorage } from '../localStorage/storage';

export const renderGenre = async (genreId, page) => {
  hideLoader();
  genreParams.with_genres = genreId;
  genreParams.page = page;

  try {
    const data = await getFilmsByGenre();
    const { genres } = await getGenres();
    renderingPaginationMarkup(page, data.total_pages);
    renderMovie(dataCombine(data.results, genres));
    addToStorage('active-genre', data.page);
  } finally {
    showLoader();
  }
};
