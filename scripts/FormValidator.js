export default class FormValidator {
  constructor(settings, formSelector) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._formSelector = formSelector;
  }

  enableValidation() {
    const formList = Array.from(document.querySelectorAll(`${this._formSelector}`));
    formList.forEach((form) => {
      this._setEventListener(form);
    });
  }

  _setEventListener(form) {
    const inputList = Array.from(form.querySelectorAll(`${this._inputSelector}`));
    const buttonElement = form.querySelector(`${this._submitButtonSelector}`);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(form, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      })
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute("disabled", "disabled");
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute("disabled", "disabled");
    }
  }

  _checkInputValidity(form, inputElement) {
    if (!inputElement.validity.valid){
      this._showInputError(form, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(form, inputElement);
    }
  }

  _showInputError(form, inputElement, errorMessage) {
    const errorElement = form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(form, inputElement) {
    const errorElement = form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
}
