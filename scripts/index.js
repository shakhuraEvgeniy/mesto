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

const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddCard = document.querySelector(".profile__add-button");
const profilePopup = document.querySelector(".popup_edit-profile");
const cardPopup = document.querySelector(".popup_new-card");
const imagePopup = document.querySelector(".popup_open-photo");
const profilePopupElementName = profilePopup.querySelector(
  ".popup__input_type_name"
);
const profilePopupElementjob = profilePopup.querySelector(
  ".popup__input_type_job"
);
const profileName = document.querySelector(".profile__name");
const profilProfession = document.querySelector(".profile__profession");
const cardPopupElementTitle = cardPopup.querySelector(
  ".popup__input_type_title"
);
const cardPopupElementLink = cardPopup.querySelector(".popup__input_type_link");
const cardsContainer = document.querySelector(".cards");
const cardBlock = document.querySelector(".card-template");
const imagePopupElementPhoto = imagePopup.querySelector(".popup__photo");
const imagePopupElementCaption = imagePopup.querySelector(".popup__caption");
const cardPopupElementForm = cardPopup.querySelector(".popup__form");

function renderCard(card) {
  cardsContainer.prepend(createCard(card));
}

function createCard(card) {
  const cardBlockNew = cardBlock.content.firstElementChild.cloneNode(true);
  const cardElementPhoto = cardBlockNew.querySelector(".card__photo");

  cardBlockNew.querySelector(".card__caption").textContent = card.name;
  cardElementPhoto.setAttribute("src", card.link);
  cardElementPhoto.setAttribute("alt", card.name);

  setCardActionsListener(cardBlockNew);
  return cardBlockNew;
}

function openPopup(popup) {
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
  profilePopupElementjob.value = profilProfession.textContent;
  openPopup(profilePopup);
}

function openAddCardPopup() {
  openPopup(cardPopup);
}

function openPhotoPopup(event) {
  imagePopupElementPhoto.src = event.target.src;
  imagePopupElementPhoto.alt = event.target.alt;
  imagePopupElementCaption.textContent = event.target.alt;
  openPopup(imagePopup);
}

function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = profilePopupElementName.value;
  profilProfession.textContent = profilePopupElementjob.value;
  closePopup(profilePopup);
}

function removeCard(event) {
  const card = event.currentTarget.closest(".card");
  card.remove();
}

function likeCard(event) {
  const heart = event.currentTarget;
  heart.classList.toggle("card__heart_active");
}

function setCardActionsListener(card) {
  card.querySelector(".card__delete").addEventListener("click", removeCard);
  card.querySelector(".card__heart").addEventListener("click", likeCard);
  card.querySelector(".card__photo").addEventListener("click", openPhotoPopup);
}

function handleNewCardFormSubmit(event) {
  event.preventDefault();
  const card = {};
  card.name = cardPopupElementTitle.value;
  card.link = cardPopupElementLink.value;
  renderCard(card);
  cardPopupElementForm.reset();
  const submitButton = event.target.querySelector('.popup__submit');
  submitButton.setAttribute("disabled", "disabled");
  submitButton.classList.add('popup__submit_disabled')
  closePopup(cardPopup);
}

buttonEditProfile.addEventListener("click", openProfilePopup);

buttonAddCard.addEventListener("click", openAddCardPopup);

profilePopup.addEventListener("submit", handleProfileFormSubmit);
cardPopup.addEventListener("submit", handleNewCardFormSubmit);
initialCards.forEach(renderCard);
