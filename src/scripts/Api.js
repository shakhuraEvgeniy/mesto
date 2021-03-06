export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
    this._headersContentType = Object.assign({}, this._headers, {
      "Content-Type": "application/json",
    });
  }

  _errorHendler = (res) => {
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка: ${res.status}`);
  };

  getAllData() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._errorHendler(res));
  }

  setUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headersContentType,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => this._errorHendler(res));
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._errorHendler(res));
  }

  addCard(name, link) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headersContentType,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => this._errorHendler(res));
  }

  setAvatar(link) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headersContentType,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then((res) => this._errorHendler(res));
  }

  removeCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._errorHendler(res));
  }

  setLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => this._errorHendler(res));
  }

  removeLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._errorHendler(res));
  }
}
