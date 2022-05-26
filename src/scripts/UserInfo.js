export default class UserInfo {
  constructor(selectors, api) {
    this._name = document.querySelector(selectors.name);
    this._job = document.querySelector(selectors.job);
  }

  getUserInfo() {
    return { name: this._name.textContent, job: this._job.textContent };
  }

  setUserInfo(name, job) {
    this._name.textContent = name;
    this._job.textContent = job;
  }
}
