export default class Card {
    constructor(data, cardSelector, handleImageClick) {
      this._name = data.name;
      this._link = data.link;
      this._cardSelector = cardSelector;
      this._handleImageClick = handleImageClick;
    }
    _getTemplate() {
      const cardElement = document
        .querySelector(this._cardSelector)
        .content.querySelector(".card")
        .cloneNode(true);
      return cardElement;
    }
    _setEventListeners() {
      this._likeButton.addEventListener("click", () => this._toggleLike());
      this._deleteButton.addEventListener("click", () => this._deleteCard());
      this._cardImageElement.addEventListener("click", () =>
        this._handleImageClick({ name: this._name, link: this._link })
      );
    }
    _toggleLike() {
      this._likeButton.classList.toggle("card__like-button_active");
    }
    _deleteCard() {
      this._element.remove();
      this._element = null;
    }
    generateCard() {
      this._element = this._getTemplate();
      this._likeButton = this._element.querySelector(".card__like-button");
      this._deleteButton = this._element.querySelector(".card__delete-button");
      this._cardImageElement = this._element.querySelector(".card__image");
      this._element.querySelector(".card__title").textContent = this._name;
      this._cardImageElement.src = this._link;
      this._cardImageElement.alt = this._name;
      this._setEventListeners();
      return this._element;
    }
  }