import galleryItems from './app.js';

const UlgalleryEl = document.querySelector('.js-gallery');

const ItemGallery = galleryItems.map((item) => {
  return `<li class="gallery__item"><a class="gallery__link" href="#"><img class="gallery__image" src="${item.preview}" alt="${item.description}" data-original="${item.original}"/></a></li>`;
});

UlgalleryEl.insertAdjacentHTML('beforeend', ItemGallery.join(''));

UlgalleryEl.addEventListener('click', onClick);

const modal = document.querySelector('.lightbox');
const modalImg = document.querySelector('.lightbox__image');

function onClick(e) {
  if (e.target.nodeName === 'IMG') {
    modal.classList.add('is-open');
    galleryItems.forEach((item) => {
      if (e.target.getAttribute('src') === item.preview) {
        modalImg.setAttribute('src', item.original);
        modalImg.setAttribute('alt', item.original);
      }
    });
  }
}

const lightboxButtonEl = document.querySelector('.lightbox__button');
const lightboxOverlayEl = document.querySelector('.lightbox__overlay');

lightboxButtonEl.addEventListener('click', closeModal);
lightboxOverlayEl.addEventListener('click', closeModal);
window.addEventListener('keydown', closeModal);

function closeModal(e) {
  console.log(e);
  if (e.type === 'keydown' && e.key !== 'Escape') {
    return;
  }
  closeEl(modal);
  modalImg.setAttribute('src', '');
  modalImg.setAttribute('alt', '');
}

function closeEl(element) {
  element.classList.remove('is-open');
}
