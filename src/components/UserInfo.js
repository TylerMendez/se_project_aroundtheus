export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);

    if (!this._name || !this._job || !this._avatar) {
      throw new Error("One or more selectors are invalid");
    }
  }
  
  setUserInfo({ name, job, avatar }) {
    this._name.textContent = name;
    this._job.textContent = job;
    if (avatar) {
      this._avatar.src = avatar;
    }
  }
  
  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent
    };
  }
}