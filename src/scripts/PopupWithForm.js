import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, onSubmit }) {
    super(popupSelector);
    this._onSubmit = onSubmit;
    this._inputList = this._popupSelector.querySelectorAll(".popup__input");
    this._form = this._popupSelector.querySelector(".popup__form");
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupSelector.addEventListener("submit", this._handleFormSubmit);
  }

  _handleFormSubmit = (evt) => {
    evt.preventDefault();
    const inputValues = this._getInputValues();
    this._onSubmit(inputValues, evt);
  };

  close() {
    super.close();
    this._form.reset();
  }
}
