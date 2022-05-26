import "../pages/index.css";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import Api from "./Api";

import {
  buttonEditProfile,
  buttonAddCard,
  profilePopupSelector,
  cardPopupSelector,
  profilePopupElementName,
  profilePopupElementJob,
  imagePopupElementPhotoSelector,
  imagePopupElementCaptionSelector,
  imagePopupSelector,
  cardsSelector,
  settings,
  buttonEditAvatar,
  avatarPopupSelector,
  profileAvatar,
  removeCardPopupSelector,
} from "../utils/constants.js";
import PopupWithConfirmation from "./PopupWithConfirmation";

var userId = "";

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-41",
  headers: {
    authorization: "d4e82cd0-9095-4cb7-97cc-532cb8bcd7e0",
  },
});

api
  .getAllData()
  .then((data) => {
    const [userData, cardsData] = data;
    userInfo.setUserInfo(userData.name, userData.about);
    profileAvatar.style.backgroundImage = `url('${userData.avatar}')`;
    userId = userData._id;

    cardsData.forEach((item) => {
      var canDeleted = false;
      if (item.owner._id === userId) {
        canDeleted = true;
      }
      const likes = item.likes.length;
      const isLiked = item.likes.some((item) => {
        return item._id === userId;
      });
      renderCard.addItem(createCard(item, canDeleted, likes, isLiked));
    });
  })
  .catch((err) => {
    console.log(err);
  });

const renderCard = new Section(
  {
    renderer: (item) => {
      renderCard.addItem(createCard(item));
    },
  },
  cardsSelector
);

function handleLikeClick(card, cardData) {
  if (!card.querySelector(".card__heart_active")) {
    return api
      .setLike(cardData._id)
      .then((data) => {
        return data.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    return api
      .removeLike(cardData._id)
      .then((data) => {
        return data.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function hendleDeleteIconClick(card, id) {
  const popupRemoveCard = new PopupWithConfirmation({
    popupSelector: removeCardPopupSelector,
    onSubmit: (evt) => {
      renderLoading(true, evt);
      api
        .removeCard(id)
        .then(() => {
          card.remove();
          popupRemoveCard.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          renderLoading(false, evt);
        });
    },
  });
  popupRemoveCard.setEventListeners();
  popupRemoveCard.open();
}

function createCard(item, canDeleted, likes, isLiked) {
  const card = new Card(
    {
      cardDate: item,
      handleCardClick: (evt) => {
        popupImage.open(evt.target.alt, evt.target.src);
      },
      handleLikeClick: (card, cardData) => {
        return handleLikeClick(card, cardData);
      },
      hendleDeleteIconClick: (card, id) => {
        hendleDeleteIconClick(card, id);
      },
    },
    ".card-template",
    canDeleted,
    likes,
    isLiked
  );
  const cardElement = card.createCard();
  return cardElement;
}

const popupImage = new PopupWithImage(
  imagePopupElementPhotoSelector,
  imagePopupElementCaptionSelector,
  imagePopupSelector
);
popupImage.setEventListeners();

const popupEditAvatar = new PopupWithForm({
  popupSelector: avatarPopupSelector,
  onSubmit: (inputValue, evt) => {
    renderLoading(true, evt);
    api
      .setAvatar(inputValue.linkInput)
      .then((data) => {
        profileAvatar.style.backgroundImage = `url('${data.avatar}')`;
        popupEditAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(false, evt);
      });
  },
});
popupEditAvatar.setEventListeners();

const popupNewCard = new PopupWithForm({
  popupSelector: cardPopupSelector,
  onSubmit: (inputValue, evt) => {
    renderLoading(true, evt);
    api
      .addCard(inputValue.titleInput, inputValue.linkInput)
      .then((data) => {
        const likes = data.likes.length;
        const isLiked = data.likes.some((item) => {
          return item._id === userId;
        });
        renderCard.addItem(createCard(data, true, likes, isLiked));
        popupNewCard.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(false, evt);
      });
  },
});
popupNewCard.setEventListeners();

const userInfo = new UserInfo({
  name: ".profile__name",
  job: ".profile__profession",
});

const popupProfile = new PopupWithForm({
  popupSelector: profilePopupSelector,
  onSubmit: (inputValue, evt) => {
    renderLoading(true, evt);
    api
      .setUserInfo({ name: inputValue.nameInput, about: inputValue.jobInput })
      .then((data) => {
        userInfo.setUserInfo(data.name, data.about);
        popupProfile.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(false, evt);
      });
  },
});
popupProfile.setEventListeners();

function openProfilePopup() {
  const userInfoData = userInfo.getUserInfo();
  profilePopupElementName.value = userInfoData.name;
  profilePopupElementJob.value = userInfoData.job;
  popupProfile.open();
  formValidators["popup__form_edit-profile"].resetValidation();
}

function openNewCardPopup() {
  popupNewCard.open();
  formValidators["popup__form_new-card"].resetValidation();
}

function openPopupEditAvatar() {
  popupEditAvatar.open();
  formValidators["popup__form_edit-avatar"].resetValidation();
}

buttonEditProfile.addEventListener("click", openProfilePopup);
buttonAddCard.addEventListener("click", openNewCardPopup);
buttonEditAvatar.addEventListener("click", openPopupEditAvatar);

const formValidators = {};

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(settings, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(settings);

function renderLoading(isLoading, evt) {
  if (isLoading) {
    evt.target.querySelector(".default").style.display = "none";
    evt.target.querySelector(".loading").style.display = "";
    evt.target
      .querySelector(".popup__submit")
      .setAttribute("disabled", "disabled");
  } else {
    evt.target.querySelector(".default").style.display = "";
    evt.target.querySelector(".loading").style.display = "none";
    evt.target
      .querySelector(".popup__submit")
      .setAttribute("disabled", "disabled");
  }
}
