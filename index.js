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
window.addEventListener('keydown', _.throttle(next, 500, { leading: true, trailing: true }));
window.addEventListener('keydown', _.throttle(previous, 500, { leading: true, trailing: true }));

function closeModal(e) {
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

function next(e) {
  if (e.key !== 'ArrowRight') {
    return;
  }

  let index = galleryItems.findIndex((img) => img.original === modalImg.getAttribute('src'));

  if (index < galleryItems.length - 1) {
    index++;
  } else {
    index = 0;
  }

  addAtribute(index);
}

function previous(e) {
  if (e.key !== 'ArrowLeft') {
    return;
  }

  let index = galleryItems.findIndex((img) => img.original === modalImg.getAttribute('src'));

  if (index > 0) {
    index--;
  } else {
    index = galleryItems.length - 1;
  }

  addAtribute(index);
}

function addAtribute(index) {
  modalImg.setAttribute('src', galleryItems[index].original);
  modalImg.setAttribute('alt', galleryItems[index].description);
}
