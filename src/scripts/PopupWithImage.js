import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(
    imagePopupElementPhotoSelector,
    imagePopupElementCaptionSelector,
    popupSelector
  ) {
    super(popupSelector);
    this._photo = this._popupSelector.querySelector(imagePopupElementPhotoSelector);
    this._caption = this._popupSelector.querySelector(imagePopupElementCaptionSelector);
  }

  open(name, link) {
    super.open();
    this._photo.src = link;
    this._photo.alt = name;
    this._caption.textContent = name;
  }
}
