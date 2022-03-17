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

const popup = document.querySelector(".popup");
const formElement = popup.querySelector(".popup__form");
const editName = document.querySelector(".profile__edit-button");
const addCard = document.querySelector(".profile__add-button");
const editPopap = document.querySelector(".popup_edit-profile");
const addPopap = document.querySelector(".popup_new-card");
const closePopup = document.querySelectorAll(".popup__close");
let nameInput = editPopap.querySelector(".popup__input_type_name");
let jobInput = editPopap.querySelector(".popup__input_type_job");
let profileName = document.querySelector(".profile__name");
let profilProfession = document.querySelector(".profile__profession");
let titleInput = addPopap.querySelector(".popup__input_type_title");
let linkInput = addPopap.querySelector(".popup__input_type_link");
const cards = document.querySelector(".cards");

function renderCard(card) {
  const cardBlock = document
    .querySelector(".card-template")
    .content.firstElementChild.cloneNode(true);

  cardBlock.querySelector(".card__caption").textContent = card.name;
  cardBlock.querySelector(".card__photo").setAttribute("src", card.link);
  cardBlock.querySelector(".card__photo").setAttribute("alt", card.name);

  setCardActionsListener(cardBlock);

  cards.append(cardBlock);
}

function openPopup(event) {
  if (event.target.classList.contains("profile__edit-button")) {
    editPopap.classList.add("popup_opened");
    nameInput.value = profileName.textContent;
    jobInput.value = profilProfession.textContent;
  } else if (event.target.classList.contains("profile__add-button")) {
    addPopap.classList.add("popup_opened");
  }
}

function closedPopup(event) {
  const popup = event.currentTarget.closest(".popup");
  popup.classList.remove("popup_opened");
}

function formSubmitHandler(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profilProfession.textContent = jobInput.value;
  closedPopup(event);
}

function removeCard(event) {
  const card = event.currentTarget.closest(".card");
  card.remove();
}

function likeCard(event) {
  const heart = event.currentTarget.closest(".card__heart");
  heart.classList.toggle("card__heart_active");
}

function setCardActionsListener(card) {
  card.querySelector(".card__delete").addEventListener("click", removeCard);
  card.querySelector(".card__heart").addEventListener("click", likeCard);
}

function formSubmitCard(event) {
  event.preventDefault();
  let card = [{}];
  console.log(titleInput);
  card.name = titleInput.value;
  card.link = linkInput.value;
  renderCard(card);
  titleInput.value = null;
  linkInput.value = null;
  closedPopup(event);
}

editName.addEventListener("click", openPopup);

addCard.addEventListener("click", openPopup);

for (let i = 0; i < closePopup.length; i++) {
  closePopup[i].addEventListener("click", closedPopup);
}

editPopap.addEventListener("submit", formSubmitHandler);
addPopap.addEventListener("submit", formSubmitCard);
initialCards.map(renderCard);
