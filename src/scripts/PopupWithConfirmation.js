import Popup from "./Popup"

export default class PopupWithConfirmation extends Popup{
  constructor({popupSelector, onSubmit}){
    super(popupSelector);
    this._onSubmit = onSubmit;
  }

  setEventListeners(){
    super.setEventListeners();
    this._popupSelector.addEventListener("submit", this._handleFormSubmit)
  }

  _handleFormSubmit = (evt) => {
    evt.preventDefault();
    this._onSubmit(evt);
  }
}
