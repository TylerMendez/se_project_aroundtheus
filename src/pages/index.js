import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import "../pages/index.css";
import { initialCards, formSettings } from "../utils/constants.js";

// Select DOM elements
const profileForm = document.querySelector('#profile-edit-form');
const addPlaceForm = document.querySelector('#add-new-place-form');
const profileEditButton = document.querySelector('#profile-edit-button');
const addButton = document.querySelector('.profile__add-button');
const profileTitleInput = document.querySelector('#profile-title-input');
const profileDescriptionInput = document.querySelector('#profile-description-input');

const cardSelector = '#card-template';

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

function handleImageClick(data) {
  popupWithImage.open(data.name, data.link);
}

function createCard(data) {
  const card = new Card(data, cardSelector, handleImageClick);
  return card.generateCard();
}

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardSection.addItem(cardElement);
    },
  },
  ".cards__list"
);
cardSection.renderItems();

const popupWithImage = new PopupWithImage("#picture-modal");
popupWithImage.setEventListeners();

const editProfilePopup = new PopupWithForm(
  "#profile-edit-modal",
  (formData) => {
    userInfo.setUserInfo({ name: formData.title, job: formData.description });
  }
);
editProfilePopup.setEventListeners();

const addCardPopup = new PopupWithForm("#profile-add-modal", (formData) => {
  const newCardData = {
    name: formData.title,
    link: formData.url,
  };
  const newCardElement = createCard(newCardData);
  cardSection.addItem(newCardElement);
});
addCardPopup.setEventListeners();

const profileFormValidator = new FormValidator(formSettings, profileForm);
profileFormValidator.enableValidation();

const addPlaceFormValidator = new FormValidator(formSettings, addPlaceForm);
addPlaceFormValidator.enableValidation();

profileEditButton.addEventListener("click", () => {
  const currentUser = userInfo.getUserInfo();
  profileTitleInput.value = currentUser.name;
  profileDescriptionInput.value = currentUser.job;
  profileFormValidator.resetValidation();
  editProfilePopup.open();
});

addButton.addEventListener("click", () => {
  addPlaceFormValidator.resetValidation();
  addCardPopup.open();
});
