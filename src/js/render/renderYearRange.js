import { renderingPaginationMarkup } from '../pagination';
import { renderMovie } from './renderByKey';
import { showLoader, hideLoader } from '../loader';
import { dataCombine } from '../genreUtils';
import { getGenres } from '../../api/getGeners';
import { getFilmsByYearRange, yearRangeParams } from '../../api/getFilmsByYearRange';
import { addToStorage } from '../localStorage/storage';

export const renderYearRange = async (fromYear, toYear, page) => {
  hideLoader();
  yearRangeParams.page = page;
  yearRangeParams.primary_release_date_gte = fromYear ? `${fromYear}-01-01` : '';
  yearRangeParams.primary_release_date_lte = toYear ? `${toYear}-12-31` : '';

  try {
    const data = await getFilmsByYearRange();
    const { genres } = await getGenres();
    renderingPaginationMarkup(page, data.total_pages);
    renderMovie(dataCombine(data.results, genres));
    addToStorage('active-year-range', data.page);
  } finally {
    showLoader();
  }
};
