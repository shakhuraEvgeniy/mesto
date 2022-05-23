import '../pages/index.css';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import UserInfo from './UserInfo.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import Api from './Api';

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
  profileAvatar
} from '../utils/constants.js';

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-41',
  headers: {
    authorization: 'd4e82cd0-9095-4cb7-97cc-532cb8bcd7e0',
    'Content-Type': 'application/json'
  }
})



api.getInitialCards()
  .then((data) =>{
    data.forEach(item =>{
      renderCard.addItem(createCard(item));
    })
  })
  .catch((err) => {
    console.log(err);
  });

api.getUserInfo()
  .then((data) =>{
    userInfo.setUserInfo(data.name, data.about);
    profileAvatar.style.backgroundImage = `url('${data.avatar}')`;
  })
  .catch((err) => {
    console.log(err);
  });

const renderCard = new Section({
  renderer: (item) =>{
    renderCard.addItem(createCard(item));
  }
}, cardsSelector);

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

const popupEditAvatar = new PopupWithForm({
  popupSelector: avatarPopupSelector,
  onSubmit: (inputValue, evt) => {
    renderLoading(true, evt);
    api.setAvatar(inputValue.linkInput)
      .then((data)=>{
        profileAvatar.style.backgroundImage = `url('${data.avatar}')`;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(()=>{
        popupEditAvatar.close();
        renderLoading(false, evt);
      })
  }
})
popupEditAvatar.setEventListeners();

const popupNewCard = new PopupWithForm({
  popupSelector: cardPopupSelector,
  onSubmit: (inputValue) => {
    renderCard.addItem(createCard({name: inputValue.titleInput, link: inputValue.linkInput}));
  }
});
popupNewCard.setEventListeners();

const userInfo = new UserInfo({name: ".profile__name", job: ".profile__profession"}, api);

const popupProfile = new PopupWithForm({
  popupSelector: profilePopupSelector,
  onSubmit: (inputValue, evt) => {
    renderLoading(true, evt);
    api.setUserInfo({name: inputValue.nameInput, about: inputValue.jobInput})
      .then((data)=>{
        userInfo.setUserInfo(data.name, data.about)
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(()=>{
        popupProfile.close();
        renderLoading(false, evt);
      })
  }
});
popupProfile.setEventListeners();

function openProfilePopup() {
  const userInfoData = userInfo.getUserInfo();
  userInfoData.then((data)=>{
    profilePopupElementName.value = data.name;
    profilePopupElementJob.value = data.about;
    popupProfile.open();
    formValidators['popup__form_edit-profile'].resetValidation();
  })
};

function openNewCardPopup () {
  popupNewCard.open();
  formValidators['popup__form_new-card'].resetValidation();
};

function openPopupEditAvatar(){
  popupEditAvatar.open();
  formValidators['popup__form_edit-avatar'].resetValidation();
}

buttonEditProfile.addEventListener("click", openProfilePopup);
buttonAddCard.addEventListener("click", openNewCardPopup);
buttonEditAvatar.addEventListener("click", openPopupEditAvatar);


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

function renderLoading(isLoading, evt) {
  if (isLoading) {
    console.log();
    evt.target.querySelector('.default').style.display = 'none';
    evt.target.querySelector('.loading').style.display = '';
    evt.target.querySelector('.popup__submit').setAttribute("disabled", "disabled");
  } else {
    evt.target.querySelector('.default').style.display = '';
    evt.target.querySelector('.loading').style.display = 'none';
    evt.target.querySelector('.popup__submit').setAttribute("disabled", "disabled");
  }
}
