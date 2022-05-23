import { data } from "browserslist";

export default class UserInfo {
  constructor(selectors, api){
    this._name = document.querySelector(selectors.name);
    this._job = document.querySelector(selectors.job);
    this._api = api;
  }

  getUserInfo(){
    return this._api.getUserInfo()
  }

  setUserInfo(name, job){
    this._name.textContent = name;
    this._job.textContent = job;
  }
}
