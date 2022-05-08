export default class Popup{
  constructor(popupSelector){
    this._popupSelector = document.querySelector(popupSelector);
  }

  open(){
    this._popupSelector.classList.add("popup_opened");
  }

  close(){
    this._popupSelector.classList.remove("popup_opened");
  }

  _handleEscClose(evt){
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners(){
    document.addEventListener("keydown", this._handleEscClose.bind(this));
    this._popupSelector.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')){
        this.close();
      }
    });
  }

  removeEventListener(){
    document.removeEventListener("keydown", this._handleEscClose.bind(this));
  }

}
