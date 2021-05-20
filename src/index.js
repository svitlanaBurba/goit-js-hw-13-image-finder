import imagesTpl from './templates/imagesTpl.hbs';
import './sass/main.scss';
import ImagesApiService from './services/apiService';
import LoadMoreBtn from './components/load-more-btn.js';

import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/src/styles/main.scss';

import { error } from '@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const refs = {
  searchForm: document.querySelector('.js-search-form'),
  galleryContainer: document.querySelector('.js-gallery-container'),
};
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
const imagesApiService = new ImagesApiService();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchImages);

function onSearch(e) {
  e.preventDefault();

  imagesApiService.query = e.currentTarget.elements.query.value;

  if (imagesApiService.query === '') {
    return error({ delay: 2500, text: 'Enter something...' });
  }

  loadMoreBtn.show();
  imagesApiService.resetPage();
  clearImagesContainer();
  fetchImages();
}

function fetchImages() {
  loadMoreBtn.disable();
  imagesApiService.fetchImages().then(images => {
    if (images.length === 0) {
      loadMoreBtn.enable();
      return error({ delay: 2500, text: 'Enter something realistic...' });
    }
    appendImagesMarkup(images);
    loadMoreBtn.enable();

    windowScrollTo();
  });
}

function appendImagesMarkup(images) {
  refs.galleryContainer.insertAdjacentHTML('beforeend', imagesTpl(images));
}

function clearImagesContainer() {
  refs.galleryContainer.innerHTML = '';
}

function windowScrollTo() {
  window.scrollTo(0, document.body.scrollHeight);
}

refs.galleryContainer.addEventListener('click', event => {
  const instance = basicLightbox.create(
    `
<img width="800" height="600" src="${event.target.dataset['img']}">
	`,
  );
  instance.show();
});
