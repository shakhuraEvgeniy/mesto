export default class Card {
  constructor(
    { cardDate, handleCardClick, handleLikeClick, hendleDeleteIconClick },
    cardSelector,
    canDeleted,
    likes,
    setLike
  ) {
    this._name = cardDate.name;
    this._link = cardDate.link;
    this._id = cardDate._id;
    this._card = cardDate;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._hendleDeleteIconClick = hendleDeleteIconClick;
    this._cardSelector = cardSelector;
    this._canDeleted = canDeleted;
    this._likes = likes;
    this._setLike = setLike;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  createCard() {
    this._element = this._getTemplate();
    const cardElementPhoto = this._element.querySelector(".card__photo");

    if (!this._canDeleted) {
      this._element.querySelector(".card__delete").style.display = "none";
    }
    if (this._setLike) {
      this._element
        .querySelector(".card__heart")
        .classList.add("card__heart_active");
    }

    this._element.querySelector(".card__count-likes").textContent = this._likes;
    this._element.querySelector(".card__caption").textContent = this._name;
    cardElementPhoto.setAttribute("src", this._link);
    cardElementPhoto.setAttribute("alt", this._name);

    this._setCardActionsListener();
    return this._element;
  }

  _heandleClickEvent = (evt) =>{
    if (evt.target.classList.contains("card__heart")){
      this._likeCard(evt)
    } else if (evt.target.classList.contains("card__delete")){
      this._removeCard(evt)
    } else if (evt.target.classList.contains("card__photo")){
      this._handleCardClick(evt);
    }
  }

  _setCardActionsListener() {
    this._element
      .addEventListener("click", this._heandleClickEvent);
  }

  _removeCard = (evt) => {
    const card = evt.currentTarget.closest(".card");
    this._hendleDeleteIconClick(card, this._id);
  };

  _likeCard = (evt) => {
    const card = evt.target.closest(".card");
    this._handleLikeClick(card, this._card)
      .then((count) => {
        card.querySelector(".card__heart").classList.toggle("card__heart_active");
        card.querySelector(".card__count-likes").textContent =
          count;
      })
  };
}
