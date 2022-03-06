let popup = document.querySelector('.popup');
let formElement = popup.querySelector('.popup__form')
const editName = document.querySelector('.profile__edit-button');
const closePopup = popup.querySelector('.popup__close');
let nameInput = popup.querySelector('.popup__input_type_name');
let jobInput = popup.querySelector('.popup__input_type_job');
let profileName = document.querySelector('.profile__name');
let profilProfession = document.querySelector('.profile__profession');

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
