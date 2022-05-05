import { imagePopup, imagePopupElementPhoto, imagePopupElementCaption } from "../utils/constants.js";
import {openPopup} from './index.js';

export class Card {
  constructor(cardDate, cardSelector, openPopup) {
    this._name = cardDate.name;
    this._link = cardDate.link;
    this._cardSelector = cardSelector;
    this._openPopup = openPopup;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  createCard() {
    this._element = this._getTemplate();
    const cardElementPhoto = this._element.querySelector(".card__photo");

    this._element.querySelector(".card__caption").textContent = this._name;
    cardElementPhoto.setAttribute("src", this._link);
    cardElementPhoto.setAttribute("alt", this._name);

    this._setCardActionsListener();
    return this._element;
  }

  _setCardActionsListener() {
    this._element.querySelector(".card__delete").addEventListener("click", this._removeCard);
    this._element.querySelector(".card__heart").addEventListener("click", this._likeCard);
    this._element.querySelector(".card__photo").addEventListener("click", this._openPhotoPopup);
  }

  _removeCard(evt) {
    const card = evt.currentTarget.closest(".card");
    card.remove();
  }

  _likeCard = (evt) => {
    const heart = evt.currentTarget;
    heart.classList.toggle("card__heart_active");
  }

  _openPhotoPopup(event) {
    imagePopupElementPhoto.src = event.target.src;
    imagePopupElementPhoto.alt = event.target.alt;
    imagePopupElementCaption.textContent = event.target.alt;
    openPopup(imagePopup);
  }
}

