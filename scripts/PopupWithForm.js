import Popup from "./Popup.js"

export default class PopupWithForm extends Popup{
  constructor({popupSelector, onSubmit}){
    super(popupSelector);
    this._onSubmit = onSubmit;
  }

  _getInputValues(){
    const inputList = this._popupSelector.querySelectorAll(".popup__input");
    const inputListValue = Array.from(inputList).map( (item) => {
      return item.value
    });
  return inputListValue;
  }

  setEventListeners(){
    super.setEventListeners();
    this._popupSelector.addEventListener("submit", this._handleFormSubmit)
  }

  _handleFormSubmit = (evt) => {
    evt.preventDefault();
    const inputValue = this._getInputValues()
    this._onSubmit(inputValue);
    this.close();
  }

  close(){
    super.close();
    this._popupSelector.querySelector(".popup__form").reset();
  }
}


