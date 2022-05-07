import Popup from "./Popup";

export default class PopupWithImage extends Popup{
  constructor(data, imagePopupElementPhotoSelector, imagePopupElementCaptionSelector){
    this._link = data.link;
    this._name = data.name;
    this._photo = document.querySelector(imagePopupElementPhotoSelector);
    this._caption = document.querySelector(imagePopupElementCaptionSelector);
  }

  open(){
    this._photo.src = this._link;
    this._photo.alt = this._name;
    this._caption = this._name;
    super.open();
  }
}
