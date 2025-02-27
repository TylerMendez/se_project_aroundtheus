import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/popupwithconfirmation.js";
import Api from "../components/Api.js";
import "../pages/index.css";
import { formSettings } from "../utils/constants.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "84fdac63-ca2f-4986-bdd8-bb1fbbff275f",
    "Content-Type": "application/json",
  },
});

api
  .getInitialCards()
  .then((cards) => {
    cards.forEach((cardData) => {
      const card = new Card(cardData, "#card-template");
      const cardElement = card.generateCard();
      cardContainer.prepend(cardElement);
    });
  })
  .catch((err) => console.error("Error rendering cards:", err));

let cardSection;
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
      avatar: userData.avatar,
    });
    cardSection = new Section(
      {
        items: cardsData,
        renderer: (item) => {
          const cardElement = createCard(item);
          cardSection.addItem(cardElement);
        },
      },
      ".cards__list"
    );
    cardSection.renderItems();
  })
  .catch((err) => {
    console.error("Error loading initial data from server:", err);
  });

const profileForm = document.querySelector("#profile-edit-form");
const addPlaceForm = document.querySelector("#add-new-place-form");
const avatarForm = document.querySelector("#avatar-form");
const profileEditButton = document.querySelector("#profile-edit-button");
const addButton = document.querySelector(".profile__add-button");
const avatarEditButton = document.querySelector("#avatar-edit-button");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const cardSelector = "#card-template";

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

const avatarPopup = new PopupWithForm("#avatar-modal", (formData) => {
  avatarPopup.renderLoading(true);
  api
    .updateAvatar({ avatar: formData.avatar })
    .then((res) => {
      userInfo.setUserInfo({
        name: res.name,
        job: res.about,
        avatar: res.avatar,
      });
      avatarPopup.close();
    })
    .catch((err) => console.error("Error updating avatar:", err))
    .finally(() => {
      avatarPopup.renderLoading(false);
    });
});
avatarPopup.setEventListeners();

const avatarFormValidator = new FormValidator(formSettings, avatarForm);
avatarFormValidator.enableValidation();
avatarEditButton.addEventListener("click", () => {
  avatarFormValidator.resetValidation();
  avatarPopup.open();
});

const popupWithImage = new PopupWithImage("#picture-modal");
popupWithImage.setEventListeners();

const editProfilePopup = new PopupWithForm(
  "#profile-edit-modal",
  (formData) => {
    editProfilePopup.renderLoading(true);
    api
      .updateUserProfile({ name: formData.title, about: formData.description })
      .then((res) => {
        userInfo.setUserInfo({
          name: res.name,
          job: res.about,
          avatar: res.avatar,
        });
        editProfilePopup.close();
      })
      .catch((err) => console.error("Error updating profile:", err))
      .finally(() => {
        editProfilePopup.renderLoading(false);
      });
  }
);
editProfilePopup.setEventListeners();

const addCardPopup = new PopupWithForm("#profile-add-modal", (formData) => {
  addCardPopup.renderLoading(true);
  api
    .addNewCard({ name: formData.title, link: formData.url })
    .then((cardData) => {
      const newCardElement = createCard(cardData);
      cardSection.addItem(newCardElement);
      addCardPopup.close();
    })
    .catch((err) => console.error("Error adding new card:", err))
    .finally(() => {
      addCardPopup.renderLoading(false);
    });
});
addCardPopup.setEventListeners();

const deleteCardPopup = new PopupWithConfirmation("#delete-card-modal");
deleteCardPopup.setEventListeners();

function handleCardDelete(cardInstance) {
  deleteCardPopup.setSubmitAction(() => {
    api
      .deleteCard(cardInstance._id)
      .then(() => {
        cardInstance.removeCard();
        deleteCardPopup.close();
      })
      .catch((err) => console.error("Error deleting card:", err));
  });
  deleteCardPopup.open();
}

function handleCardLike(cardInstance) {
  if (!cardInstance._isLiked) {
    api
      .likeCard(cardInstance._id)
      .then((updatedCard) => {
        cardInstance.updateLikeState(true);
      })
      .catch((err) => console.error("Error liking card:", err));
  } else {
    api
      .dislikeCard(cardInstance._id)
      .then((updatedCard) => {
        cardInstance.updateLikeState(false);
      })
      .catch((err) => console.error("Error disliking card:", err));
  }
}

function handleImageClick(data) {
  popupWithImage.open(data.name, data.link);
}

function createCard(data) {
  const card = new Card(
    data,
    cardSelector,
    handleImageClick,
    handleCardDelete,
    handleCardLike
  );
  return card.generateCard();
}

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

avatarEditButton.addEventListener("click", () => {
  avatarFormValidator.resetValidation();
  avatarPopup.open();
});
