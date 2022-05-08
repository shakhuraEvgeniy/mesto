import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
  constructor(evt, imagePopupElementPhotoSelector, imagePopupElementCaptionSelector, popupSelector){
    super(popupSelector);
    this._link = evt.target.src;
    this._name = evt.target.alt;
    this._photo = document.querySelector(imagePopupElementPhotoSelector);
    this._caption = document.querySelector(imagePopupElementCaptionSelector);
  }

  open(){
    super.open();
    this._photo.src = this._link;
    this._photo.alt = this._name;
    this._caption.textContent = this._name;
  }
}
