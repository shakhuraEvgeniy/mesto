import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import UserInfo from './UserInfo.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';

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
  initialCards,
  settings,
} from '../utils/constants.js';


const renderCard = new Section({
  items: initialCards,
  renderer: (item) =>{
    const card = new Card({
      cardDate: item,
      handleCardClick: (evt) => {
        const popupImage = new PopupWithImage(evt, imagePopupElementPhotoSelector, imagePopupElementCaptionSelector, imagePopupSelector);
        popupImage.setEventListeners();
        popupImage.open();
      }
  },'.card-template');
    const cardElement = card.createCard();
    renderCard.addItem(cardElement);
  }
}, cardsSelector);

renderCard.renderItems();

const popupNewCard = new PopupWithForm({
  popupSelector: cardPopupSelector,
  onSubmit: (inputValue) => {
    const renderCard = new Section({
      items: [{name: inputValue[0], link: inputValue[1]}],
      renderer: (item) =>{
        const card = new Card({
          cardDate: item,
          handleCardClick: (evt) => {
            const popupImage = new PopupWithImage(evt, imagePopupElementPhotoSelector, imagePopupElementCaptionSelector, imagePopupSelector);
            popupImage.setEventListeners();
            popupImage.open();
          }
      },'.card-template');
        const cardElement = card.createCard();
        renderCard.addItem(cardElement);
      }
    }, cardsSelector);
    renderCard.renderItems();
  }
});

const userInfo = new UserInfo({name: ".profile__name", job: ".profile__profession"});

const popupProfile = new PopupWithForm({
  popupSelector: profilePopupSelector,
  onSubmit: (inputValue) => {
    userInfo.setUserInfo(inputValue[0], inputValue[1]);
  }
});

function openProfilePopup() {
  const userInfoData = userInfo.getUserInfo();
  profilePopupElementName.value = userInfoData.name;
  profilePopupElementJob.value = userInfoData.job;
  popupProfile.open();
  popupProfile.setEventListeners();
};

function openNewCardPopup () {
  popupNewCard.setEventListeners();
  popupNewCard.open();
};

buttonEditProfile.addEventListener("click", openProfilePopup);

buttonAddCard.addEventListener("click", openNewCardPopup);

const validate = new FormValidator(settings, '.popup__form');
validate.enableValidation();
