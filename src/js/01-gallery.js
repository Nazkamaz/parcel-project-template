import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryItems } from './gallery-items';

const galleryDivEl = document.querySelector(".gallery");

const galleryMarkup = galleryItems
  .map(({preview, original, description}) => {
    return `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`;
  })
  .join("");

galleryDivEl.insertAdjacentHTML("afterbegin", galleryMarkup);

galleryDivEl.addEventListener("click", onClickImage);

function onClickImage(event) {
  event.preventDefault();

  if (event.target.tagName !== "IMG") {
    return;
  }
  const largeImg = event.target.dataset.source;

  const instance = SimpleLightbox.create(`
    <img src="${largeImg}" width="800" height="600">
`);
  instance.show();

  function closeModal(event) {
    if (event.key === "Escape") {
      instance.close();
    }
    galleryDivEl.removeEventListener("keydown", closeModal);
  }

  galleryDivEl.addEventListener("keydown", closeModal);

}