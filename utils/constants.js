export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

export const buttonEditProfile = document.querySelector(".profile__edit-button");
export const buttonAddCard = document.querySelector(".profile__add-button");
export const profilePopup = document.querySelector(".popup_edit-profile");
export const cardPopup = document.querySelector(".popup_new-card");
export const imagePopup = document.querySelector(".popup_open-photo");
export const imagePopupElementPhoto = imagePopup.querySelector(".popup__photo");
export const imagePopupElementCaption = imagePopup.querySelector(".popup__caption");
export const profilePopupElementName = profilePopup.querySelector(
  ".popup__input_type_name"
);
export const profilePopupElementJob = profilePopup.querySelector(
  ".popup__input_type_job"
);
export const profileName = document.querySelector(".profile__name");
export const profilProfession = document.querySelector(".profile__profession");
export const cardPopupElementTitle = cardPopup.querySelector(
  ".popup__input_type_title"
);
export const cardPopupElementLink = cardPopup.querySelector(".popup__input_type_link");
export const cardsContainer = document.querySelector(".cards");
export const cardPopupElementForm = cardPopup.querySelector(".popup__form");

