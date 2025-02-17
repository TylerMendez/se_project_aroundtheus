export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._name = document.querySelector(nameSelector); 
    this._job = document.querySelector(jobSelector);  
  }
  setUserInfo({ name, job }) {
    if (this._name && this._job) {
      this._name.textContent = name;  
      this._job.textContent = job;  
    } 
  }
  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent,
    };
  }
}