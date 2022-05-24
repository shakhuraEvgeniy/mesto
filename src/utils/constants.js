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
export const buttonEditAvatar = document.querySelector('.profile__edit-avatar');
export const profileAvatar = document.querySelector('.profile__avatar')
export const profilePopupSelector = ".popup_edit-profile";
export const cardPopupSelector = ".popup_new-card";
export const avatarPopupSelector = ".popup_edit-avatar";
export const imagePopupSelector = ".popup_open-photo";
export const imagePopupElementPhotoSelector = ".popup__photo";
export const imagePopupElementCaptionSelector = ".popup__caption";
export const profilePopup = document.querySelector(".popup_edit-profile");
export const profilePopupElementName = profilePopup.querySelector(
  ".popup__input_type_name"
);
export const profilePopupElementJob = profilePopup.querySelector(
  ".popup__input_type_job"
);
export const cardsSelector = ".cards";
export const removeCardPopupSelector = ".popup_delete-card";
