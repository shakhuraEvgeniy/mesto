export default class Card {
  constructor({cardDate, handleCardClick, handleLikeClick, hendleDeleteIconClick}, cardSelector, isDeleted, likes) {
    this._name = cardDate.name;
    this._link = cardDate.link;
    this._id = cardDate._id;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._hendleDeleteIconClick = hendleDeleteIconClick;
    this._cardSelector = cardSelector;
    this._isDeleted = isDeleted;
    this._likes = likes;
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

    if (!this._isDeleted) {
      this._element.querySelector('.card__delete').style.display = 'none';
    }
    console.log(this._likes);
    this._element.querySelector(".card__count-likes").textContent = this._likes;
    this._element.querySelector(".card__caption").textContent = this._name;
    cardElementPhoto.setAttribute("src", this._link);
    cardElementPhoto.setAttribute("alt", this._name);

    this._setCardActionsListener();
    return this._element;
  }

  _setCardActionsListener() {
    this._element.querySelector(".card__delete").addEventListener("click", this._removeCard);
    this._element.querySelector(".card__heart").addEventListener("click", this._likeCard);
    this._element.querySelector(".card__photo").addEventListener("click", this._handleCardClick);
  }

  _removeCard = (evt) => {
    const card = evt.currentTarget.closest(".card");
    this._hendleDeleteIconClick(card, this._id);
  }

  _likeCard = (evt) => {
    const heart = evt.currentTarget;
    heart.classList.toggle("card__heart_active");
    console.log(evt);
    this._handleLikeClick(evt)
  }
}

