import { renderingPaginationMarkup } from '../pagination';
import { renderMovie } from './renderByKey';
import { showLoader, hideLoader } from '../loader';
import { dataCombine } from '../genreUtils';
import { getGenres } from '/src/api/getGeners';
import { cartoonsParams, getCartoonsFilms } from '/src/api/getCartoonsFilms';
import { addToStorage } from '../localStorage/storage';

export const renderCartoons = async page => {
  hideLoader();
  cartoonsParams.page = page;
  const { ...data } = await getCartoonsFilms();
  renderingPaginationMarkup(page, data.total_pages);
  const { genres } = await getGenres();
  const fullInfo = dataCombine(data.results, genres);
  renderMovie(fullInfo);
  const currentPage = data.page;
  addToStorage('active-cartoons', currentPage);
  showLoader();
};
