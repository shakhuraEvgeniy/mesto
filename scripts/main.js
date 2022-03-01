let formElement = document.querySelector('.popup');
let editName = document.querySelector('.profile__edit-button');
let closePopup = formElement.querySelector('.popup__close');
let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_job');
let profileName = document.querySelector('.profile__name');
let profilProfession = document.querySelector('.profile__profession');

function closedPopup () {
  formElement.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profilProfession.textContent = jobInput.value;
  closedPopup();
}

editName.addEventListener('click', function(){
  formElement.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profilProfession.textContent;
});

closePopup.addEventListener('click', closedPopup);

formElement.addEventListener('submit', formSubmitHandler);
