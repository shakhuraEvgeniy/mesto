import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import Popup from './Popup.js';
import UserInfo from './UserInfo.js';
import PopupWithImage from './PopupWithImage.js';

import {
  buttonEditProfile,
  buttonAddCard,
  profilePopupSelector,
  cardPopupSelector,
  profilePopupElementName,
  profilePopupElementJob,
  profilePopup,
  cardPopup,
  imagePopupElementPhotoSelector,
  imagePopupElementCaptionSelector,
  imagePopupSelector,
  cardPopupElementTitle,
  cardPopupElementLink,
  cardsSelector,
  cardPopupElementForm,
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


function openProfilePopup() {
  const userInfo = new UserInfo({name: ".profile__name", job: ".profile__profession"});
  const userInfoData = userInfo.getUserInfo();

  profilePopupElementName.value = userInfoData.name;
  profilePopupElementJob.value = userInfoData.job;

  const popup = new Popup (profilePopup);
  popup.open();
  popup.setEventListeners();
}

function handleProfileFormSubmit(event) {
  event.preventDefault();
  const userInfo = new UserInfo({name: ".profile__name", job: ".profile__profession"});
  userInfo.setUserInfo(profilePopupElementName.value, profilePopupElementJob.value)
  const popup = new Popup (profilePopupSelector);
  popup.close();
  popup.removeEventListener();
}

function handleNewCardFormSubmit(event) {
  event.preventDefault();
  const renderCard = new Section({
    items: [{name: cardPopupElementTitle.value, link: cardPopupElementLink.value}],
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

  cardPopupElementForm.reset();
  const submitButton = event.target.querySelector('.popup__submit');
  submitButton.setAttribute("disabled", "disabled");
  submitButton.classList.add('popup__submit_disabled');
  const popup = new Popup (cardPopupSelector);
  popup.close();
}

buttonEditProfile.addEventListener("click", openProfilePopup);

buttonAddCard.addEventListener("click", () => {
  const popup = new Popup (cardPopupSelector);
  popup.open();
});

profilePopup.addEventListener("submit", handleProfileFormSubmit);
cardPopup.addEventListener("submit", handleNewCardFormSubmit);

const validate = new FormValidator(settings, '.popup__form');
validate.enableValidation();
