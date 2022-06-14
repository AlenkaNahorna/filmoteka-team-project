import { requestForMovie } from '../js/fetch/fetchByKey';
import { requestForPage } from '../js/fetch/trendingMovie';

const refs = {
  paginationList: document.querySelector('.pagination-list'),
};
const gallery = document.querySelector('.gallery');


function renderSpan(value) {
  return `<span data-value='${value}'>${value}</span>`;
}

export async function renderingPaginationMarkup(currentPage, maxPage) {
  const pagesArray = Array.apply(null, {
    length: maxPage ?? 0,
  })
    .map(Number.call, Number)
    .map(item => item + 1);
  let result =
    pagesArray.length <= 3
      ? pagesArray.map(item => renderSpan(item))
      : pagesArray
          .map(item => {
            if (
              item === maxPage ||
              item === 1 ||
              item === currentPage - 1 ||
              item === currentPage + 1 ||
              item === currentPage - 2 ||
              item === currentPage + 2 ||
              item === currentPage
            ) {
              return renderSpan(item);
            }
            if (item === currentPage - 3) {
              return "<span class='dots' data-value='minDots'>...</span>";
            } 
            if (item === currentPage + 3) {return "<span class='dots' data-value='maxDots'>...</span>";}
            return '';
          })
          .join('');
  if (currentPage > 1) {
    result = "<span class='arrow-left' data-span='prev'></span>" + result;
  }
  if (currentPage >= 1 && currentPage !== maxPage) {
    result = result + "<span class='arrow-right' data-span='next'></span>";
  }
  refs.paginationList.innerHTML = result;
  console.log(refs.paginationList.querySelectorAll('span'));
  refs.paginationList.querySelectorAll('span').forEach(item => {
    if (item.innerHTML == currentPage) {
      console.log(item);
      item.classList.toggle('active');
    }
  });
}

function onPaginationBtnClick(event) {
  // event.preventDefault();
  page = Number(event.target.textContent);
  if (event.target.nodeName !== 'SPAN') {
    requestForPage();
    return;
  }
  if (event.target.dataset.span === 'prev') {
    page -= 1;
    requestForPage();
    return;
  }
  if (event.target.dataset.span === 'next') {
    page += 1;
    requestForPage();
    return;
  }
  if (event.target.dataset.value === 'maxDots') {
      page += 1;
      requestForPage();
      console.log('max dots');
      return;
    } 
    if (event.target.dataset.value === 'minDots') {
      page -= 1;
      console.log('min dots');
      requestForPage();
      return;
    }
    requestForPage();
} 
refs.paginationList?.addEventListener('click', onPaginationBtnClick); 
// renderingPaginationMarkup(1);



