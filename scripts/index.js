const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];



let popup = document.querySelector('.popup');
let formElement = popup.querySelector('.popup__form')
const editName = document.querySelector('.profile__edit-button');
const closePopup = popup.querySelector('.popup__close');
let nameInput = popup.querySelector('.popup__input_type_name');
let jobInput = popup.querySelector('.popup__input_type_job');
let profileName = document.querySelector('.profile__name');
let profilProfession = document.querySelector('.profile__profession');
const cards = document.querySelector('.cards');

function renderCard (card) {
  const cardBlock = document
  .querySelector(".card-template")
  .content.firstElementChild.cloneNode(true);

  cardBlock.querySelector(".card__caption").textContent = card.name;
  cardBlock.querySelector(".card__photo").setAttribute("src", card.link);
  cardBlock.querySelector(".card__photo").setAttribute("alt", card.name);

  cards.append(cardBlock);
}

function closedPopup () {
  popup.classList.remove('popup_opened');
}

function openPopup () {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profilProfession.textContent;
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profilProfession.textContent = jobInput.value;
  closedPopup();
}

editName.addEventListener('click', openPopup);

closePopup.addEventListener('click', closedPopup);

formElement.addEventListener('submit', formSubmitHandler);

initialCards.map(renderCard);
