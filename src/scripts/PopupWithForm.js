import Popup from "./Popup.js"

export default class PopupWithForm extends Popup{
  constructor({popupSelector, onSubmit}){
    super(popupSelector);
    this._onSubmit = onSubmit;
    this._inputList = this._popupSelector.querySelectorAll(".popup__input");
    this._form = this._popupSelector.querySelector(".popup__form")
  }

  _getInputValues(){
    const formValues = {};
    this._inputList.forEach(input =>{
      formValues[input.name] = input.value
    })
    console.log(formValues);
  return formValues;
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
    this._form.reset();
  }
}


