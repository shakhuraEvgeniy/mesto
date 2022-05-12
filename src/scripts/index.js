import '../pages/index.css';
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

function createCard(item) {
  const card = new Card({
    cardDate: item,
    handleCardClick: (evt) => {
      popupImage.open(evt.target.alt, evt.target.src);
    }
  },'.card-template');
  const cardElement = card.createCard();
  return cardElement;
}
const popupImage = new PopupWithImage(imagePopupElementPhotoSelector, imagePopupElementCaptionSelector, imagePopupSelector);
popupImage.setEventListeners();

function renderCard(dataCard) {
  const renderCard = new Section({
    items: dataCard,
    renderer: (item) =>{
      renderCard.addItem(createCard(item));
    }
  }, cardsSelector);
    renderCard.renderItems();
}

renderCard(initialCards);

const popupNewCard = new PopupWithForm({
  popupSelector: cardPopupSelector,
  onSubmit: (inputValue) => {
    renderCard([{name: inputValue.titleInput, link: inputValue.linkInput}]);
  }
});
popupNewCard.setEventListeners();

const userInfo = new UserInfo({name: ".profile__name", job: ".profile__profession"});

const popupProfile = new PopupWithForm({
  popupSelector: profilePopupSelector,
  onSubmit: (inputValue) => {
    userInfo.setUserInfo(inputValue.nameInput, inputValue.jobInput);
  }
});
popupProfile.setEventListeners();

function openProfilePopup() {
  const userInfoData = userInfo.getUserInfo();
  profilePopupElementName.value = userInfoData.name;
  profilePopupElementJob.value = userInfoData.job;
  popupProfile.open();
  formValidators['popup__form_edit-profile'].resetValidation();
};

function openNewCardPopup () {
  popupNewCard.open();
  formValidators['popup__form_new-card'].resetValidation();
};

buttonEditProfile.addEventListener("click", openProfilePopup);
buttonAddCard.addEventListener("click", openNewCardPopup);

const formValidators = {}

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(settings, formElement)
    const formName = formElement.getAttribute('name')
    formValidators[formName] = validator;
   validator.enableValidation();
  });
};

enableValidation(settings);
