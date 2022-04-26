import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

const initialCards = [
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

const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddCard = document.querySelector(".profile__add-button");
const profilePopup = document.querySelector(".popup_edit-profile");
const cardPopup = document.querySelector(".popup_new-card");
export const imagePopup = document.querySelector(".popup_open-photo");
export const imagePopupElementPhoto = imagePopup.querySelector(".popup__photo");
export const imagePopupElementCaption = imagePopup.querySelector(".popup__caption");
const profilePopupElementName = profilePopup.querySelector(
  ".popup__input_type_name"
);
const profilePopupElementJob = profilePopup.querySelector(
  ".popup__input_type_job"
);
const profileName = document.querySelector(".profile__name");
const profilProfession = document.querySelector(".profile__profession");
const cardPopupElementTitle = cardPopup.querySelector(
  ".popup__input_type_title"
);
const cardPopupElementLink = cardPopup.querySelector(".popup__input_type_link");
const cardsContainer = document.querySelector(".cards");
const cardPopupElementForm = cardPopup.querySelector(".popup__form");
const listForm = document.querySelectorAll(".popup__form");


function renderCard(cardDate) {
  const card = new Card(cardDate, '.card-template');
  const cardElement = card.createCard();
  cardsContainer.prepend(cardElement);
}

export function openPopup(popup) {
  popup.classList.add("popup_opened");
  popup.addEventListener("mousedown", handlePopupClose);
  document.addEventListener("keydown", handleEscKey);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  popup.removeEventListener("mousedown", handlePopupClose);
  document.removeEventListener("keydown", handleEscKey);
}

function handlePopupClose(evt) {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')){
    closePopup(evt.currentTarget);
  }
}

function handleEscKey(evt) {
  if (evt.key === "Escape"){
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
}

function openProfilePopup() {
  profilePopupElementName.value = profileName.textContent;
  profilePopupElementJob.value = profilProfession.textContent;
  openPopup(profilePopup);
}

function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = profilePopupElementName.value;
  profilProfession.textContent = profilePopupElementJob.value;
  closePopup(profilePopup);
}

function handleNewCardFormSubmit(event) {
  event.preventDefault();
  renderCard({name: cardPopupElementTitle.value, link: cardPopupElementLink.value});
  cardPopupElementForm.reset();
  const submitButton = event.target.querySelector('.popup__submit');
  submitButton.setAttribute("disabled", "disabled");
  submitButton.classList.add('popup__submit_disabled');
  closePopup(cardPopup);
}

buttonEditProfile.addEventListener("click", openProfilePopup);

buttonAddCard.addEventListener("click", () => openPopup(cardPopup));

profilePopup.addEventListener("submit", handleProfileFormSubmit);
cardPopup.addEventListener("submit", handleNewCardFormSubmit);
initialCards.forEach(renderCard);

const validate = new FormValidator(settings, '.popup__form');
validate.enableValidation();
