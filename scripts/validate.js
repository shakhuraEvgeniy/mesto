function enableValidation({formSelector, ...rest}){
  const formList = Array.from(document.querySelectorAll(`${formSelector}`));
  formList.forEach((form) => {
    setEventListener(form, rest);
  })
}

function setEventListener(form, {inputSelector, submitButtonSelector, ...rest}) {
  const inputList = Array.from(form.querySelectorAll(`${inputSelector}`));
  const buttonElement = form.querySelector(`${submitButtonSelector}`);
  toggleButtonState(inputList, buttonElement, rest);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () =>{
      checkInputValidity(form, inputElement, rest);
      toggleButtonState(inputList, buttonElement, rest);
    })
  });
}

function checkInputValidity(form, inputElement, {...rest}) {
  if (!inputElement.validity.valid){
    showInputError(form, inputElement, inputElement.validationMessage, rest);
  } else {
    hideInputError(form, inputElement, rest);
  }
}

function showInputError(form, inputElement, errorMessage, {inputErrorClass, errorClass, ...rest}) {
  const errorElement = form.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

function hideInputError(form, inputElement, {inputErrorClass, errorClass, ...rest}) {
  const errorElement = form.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(errorClass);
}

function toggleButtonState(inputList, buttonElement, {inactiveButtonClass, ...rest}) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
  }
}

function hasInvalidInput(inputList){
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});
