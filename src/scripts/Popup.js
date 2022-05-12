export default class Popup{
  constructor(popupSelector){
    this._popupSelector = document.querySelector(popupSelector);
  }

  open(){
    this._popupSelector.classList.add("popup_opened");
  }

  close(){
    this._popupSelector.classList.remove("popup_opened");
    this._removeEventListener();
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners(){
    document.addEventListener("keydown", this._handleEscClose);
    this._popupSelector.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')){
        this.close();
      }
    });
  }

  _removeEventListener(){
    document.removeEventListener("keydown", this._handleEscClose);
  }

}
