import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  open(name, link) {
    const imageElement = this._popup.querySelector('.modal__image');
    const captionElement = this._popup.querySelector('.modal__caption');
    imageElement.src = link;
    imageElement.alt = name;
    captionElement.textContent = name;
    super.open();
  }
}