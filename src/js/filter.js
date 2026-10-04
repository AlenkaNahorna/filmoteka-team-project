import {requestForPage} from './render/renderPopularMovies';
import {renderUpComing} from './render/renderUpComing';
import {renderTopRated} from './render/renderTopRated';
import {refs} from '../js/refs/refs.js'
import { renderYearRange } from './render/renderYearRange';

 let page = 1;
 const filter = () => {
refs.filter.topRatedBtn.addEventListener('click', onClickTopRatedBtn);
refs.filter.popularBtn.addEventListener('click', onClickPopularBtn);
refs.filter.upcomingBtn.addEventListener('click', onClicUpcomingBtn);
refs.filter.yearApplyBtn.addEventListener('click', onYearRangeApply);

const currentYear = new Date().getFullYear();
refs.filter.yearFrom.max = currentYear;
refs.filter.yearTo.max = currentYear;

function resetYearRange() {
  refs.filter.yearFrom.value = '';
  refs.filter.yearTo.value = '';
}

function onYearRangeApply() {
  const fromYear = Number(refs.filter.yearFrom.value) || '';
  const toYear = Number(refs.filter.yearTo.value) || '';

  if (!fromYear && !toYear) {
    onClickPopularBtn();
    return;
  }

  if ((fromYear && fromYear < 1870) || (toYear && toYear < 1870)) {
    refs.filter.yearFrom.setCustomValidity('Year must be 1870 or later.');
    refs.filter.yearFrom.reportValidity();
    refs.filter.yearFrom.setCustomValidity('');
    return;
  }

  if (fromYear && toYear && fromYear > toYear) {
    refs.filter.yearTo.setCustomValidity('The end year must be after the start year.');
    refs.filter.yearTo.reportValidity();
    refs.filter.yearTo.setCustomValidity('');
    return;
  }

  refs.pagination.input.value = '';
  refs.home.gallery.innerHTML = '';
  refs.pagination.paginationList.innerHTML = '';
  refs.filter.popularBtn.classList.remove('btn-tab-active');
  refs.filter.topRatedBtn.classList.remove('btn-tab-active');
  refs.filter.upcomingBtn.classList.remove('btn-tab-active');
  renderYearRange(fromYear, toYear, 1);
}

function onClickTopRatedBtn() {
  refs.pagination.input.value = '';
  resetYearRange();
  refs.home.gallery.innerHTML ='';
  refs.filter.topRatedBtn.classList.add('btn-tab-active');
  refs.filter.popularBtn.classList.remove('btn-tab-active');
  refs.filter.upcomingBtn.classList.remove('btn-tab-active');
  renderTopRated(page);
}
function onClicUpcomingBtn() {
  refs.home.gallery.innerHTML ='';
  refs.pagination.input.value = '';
  resetYearRange();
  refs.filter.upcomingBtn.classList.add('btn-tab-active');
  refs.filter.popularBtn.classList.remove('btn-tab-active');
  refs.filter.topRatedBtn.classList.remove('btn-tab-active');
  renderUpComing(page);
}

function onClickPopularBtn() {
  refs.home.gallery.innerHTML ='';
  refs.pagination.input.value = '';
  resetYearRange();
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
