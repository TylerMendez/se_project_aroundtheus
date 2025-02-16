import Card from "../Card.js";
import FormValidator from "../FormValidator.js";
import Popup from "../Popup.js";
import Section from "../Section.js";
import UserInfo from "../UserInfo.js";
import PopupWithForm from "../PopupWithForm.js";
import PopupWithImage from "../PopupWithImage.js";
import "./pages/index.css";
import { initialCards, formSettings } from "../utils/constants.js";

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
