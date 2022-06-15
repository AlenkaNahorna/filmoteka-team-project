export const refs = {
  home: {
    formEl: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
  },
  library: {
    btnQueue: document.querySelector('.btn--queue'),
    libraryGallery: document.querySelector('.gallery--library'),
    btnWatched: document.querySelector('.btn--watched'),
  },
  pagination: {
    paginationList: document.querySelector('.pagination-list'),
    input: document.querySelector('.search-field'),
    libraryGallery: document.querySelector('.gallery--library'),
  },
  theme: {
    body: document.querySelector('body'),
    toggle: document.querySelector('.theme-switch__toggle'),
    footerDarktheme: document.querySelector('.footer'),
    wrapper: document.querySelector('.main-wrapper'),
  },
  trailer: {
    videoplayerBackdrop: document.querySelector('.videoplayer-backdrop'),
    videoplayerContainer: document.querySelector('.videoplayer-container'),
  },
  auth: {
    signupForm: document.getElementById('signupForm'),
    loginForm: document.getElementById('loginForm'),
    signOutBtn: document.getElementById('signOut'),
    googleBtn: document.getElementById('googleBtn'),
  },
  modalRefs: {
    lightbox: document.querySelector('.modal-movie-lightbox'),
    closeModalBtn: document.querySelector('[data-action="close-lightbox"]'),
    overlayModal: document.querySelector('.modal-movie-overlay'),
    galleryMovie: document.querySelector('.gallery'),
    galleryMovieLibrary: document.querySelector('.gallery--library'),
    mainContainer: document.querySelector('.main__container'),
    body: document.querySelector('body'),
    trailerBtn: document.querySelector('.buttonYouTubeTrailer'),
    watchedBtn: document.querySelector('.modal-watched-button'),
    queueBtn: document.querySelector('.modal-queue-button'),
  },
  scroll: {
    rootElement: document.documentElement,
    scrolltop: document.createElement('a'),
  },
  footer: {
    openBtn: document.querySelector('.js-open-modal'),
    backdrop: document.querySelector('.backdrop'),
  },
};
