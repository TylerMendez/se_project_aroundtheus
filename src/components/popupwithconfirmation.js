import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector("form");
    if (!this._form) {
      throw new Error(`Form element not found in popup with selector ${popupSelector}`);
    }
  }
  
  setSubmitAction(action) {
    this._handleSubmit = action;
  }
  
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      if (this._handleSubmit) {
        this._handleSubmit();
      }
    });
  }
  
  close() {
    super.close();
    this._form.reset();
  }
}