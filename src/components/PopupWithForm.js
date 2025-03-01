import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector("form");
    if (!this._form) {
      throw new Error(`Form element not found in popup with selector ${popupSelector}`);
    }
    this._inputList = Array.from(this._form.querySelectorAll("input"));
    this._submitButton = this._form.querySelector("button[type='submit']");
    this._defaultButtonText = this._submitButton.textContent;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = this._getInputValues();
      this._handleFormSubmit(formData);
    });
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Saving...";
    } else {
      this._submitButton.textContent = this._defaultButtonText;
    }
  }

  close() {
    super.close();
    this._form.reset();
  }
}