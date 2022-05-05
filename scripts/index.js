import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {
  buttonEditProfile,
  buttonAddCard,
  profilePopup,
  cardPopup,
  profilePopupElementName,
  profilePopupElementJob,
  profileName,
  profilProfession,
  cardPopupElementTitle,
  cardPopupElementLink,
  cardsContainer,
  cardPopupElementForm,
  initialCards,
  settings,
} from '../utils/constants.js';

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
