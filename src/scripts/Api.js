export default class Api{
  constructor(config){
    this._url = config.url;
    this._headers = config.headers;
  }

  getUserInfo(){
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then((res) =>{
      if (res.ok) return res.json();
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  setUserInfo(data){
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then((res) =>{
      if (res.ok) return res.json();
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    })
    .then((res) =>{
      if (res.ok) return res.json();
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  addCard(name, link){
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers
    })
    .then((res) =>{
      if (res.ok) return res.json();
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }
}
