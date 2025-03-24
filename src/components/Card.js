export default class Card {
  constructor(data, cardSelector, handleImageClick, handleCardDelete, handleCardLike) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._isLiked = data.isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;    
  }
  
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }
  
  _setEventListeners() {
    if (this._likeButton) {
      this._likeButton.addEventListener("click", () => this._handleCardLike(this));
    }
    if (this._deleteButton) {
      this._deleteButton.addEventListener("click", () => this._handleCardDelete(this));
    }
    if (this._cardImageElement) {
      this._cardImageElement.addEventListener("click", () =>
        this._handleImageClick({ name: this._name, link: this._link })
      );
    }
  }
  
  updateLikeState(isLiked) {
    this._isLiked = isLiked;
    if (isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }
  
  removeCard() {
    if (this._element) {
      this._element.remove();
      this._element = null;
    }
  }
  
  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._cardImageElement = this._element.querySelector(".card__image");
    this._element.querySelector(".card__title").textContent = this._name;
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;
    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    }
    this._setEventListeners();
    return this._element;
  }
}