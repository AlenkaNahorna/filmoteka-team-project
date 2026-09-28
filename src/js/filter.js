import {requestForPage} from './render/renderPopularMovies';
import {renderUpComing} from './render/renderUpComing';
import {renderTopRated} from './render/renderTopRated';
import {refs} from '../js/refs/refs.js'
import { renderGenre } from './render/renderGenre';
import { getGenres } from '../api/getGeners';

 let page = 1;
 const filter = () => {
populateGenres();
refs.filter.topRatedBtn.addEventListener('click', onClickTopRatedBtn);
refs.filter.popularBtn.addEventListener('click', onClickPopularBtn);
refs.filter.upcomingBtn.addEventListener('click', onClicUpcomingBtn);
refs.filter.genreSelect.addEventListener('change', onGenreChange);

async function populateGenres() {
  try {
    const { genres } = await getGenres();
    refs.filter.genreSelect.insertAdjacentHTML(
      'beforeend',
      genres.map(({ id, name }) => `<option value="${id}">${name}</option>`).join('')
    );
  } catch (error) {
    console.error('Unable to load genres:', error);
  }
}

function resetCategoryButtons() {
  refs.filter.popularBtn.classList.remove('btn-tab-active');
  refs.filter.topRatedBtn.classList.remove('btn-tab-active');
  refs.filter.upcomingBtn.classList.remove('btn-tab-active');
}

function onGenreChange(event) {
  const genreId = event.currentTarget.value;
  if (!genreId) {
    onClickPopularBtn();
    return;
  }

  refs.pagination.input.value = '';
  refs.home.gallery.innerHTML = '';
  refs.pagination.paginationList.innerHTML = '';
  resetCategoryButtons();
  renderGenre(genreId, page);
}

function onClickTopRatedBtn() {
  refs.pagination.input.value = '';
  refs.filter.genreSelect.value = '';
  refs.home.gallery.innerHTML ='';
  refs.filter.topRatedBtn.classList.add('btn-tab-active');
  refs.filter.popularBtn.classList.remove('btn-tab-active');
  refs.filter.upcomingBtn.classList.remove('btn-tab-active');
  renderTopRated(page);
}
function onClicUpcomingBtn() {
  refs.home.gallery.innerHTML ='';
  refs.pagination.input.value = '';
  refs.filter.genreSelect.value = '';
  refs.filter.upcomingBtn.classList.add('btn-tab-active');
  refs.filter.popularBtn.classList.remove('btn-tab-active');
  refs.filter.topRatedBtn.classList.remove('btn-tab-active');
  renderUpComing(page);
}

function onClickPopularBtn() {
  refs.home.gallery.innerHTML ='';
  refs.pagination.input.value = '';
  refs.filter.genreSelect.value = '';
  refs.filter.popularBtn.classList.add('btn-tab-active');
  refs.filter.topRatedBtn.classList.remove('btn-tab-active');
  refs.filter.upcomingBtn.classList.remove('btn-tab-active');
requestForPage(page);
refs.pagination.paginationList.innerHTML = '';
}
}
if (document.title === 'Home') {
    filter();
  }
