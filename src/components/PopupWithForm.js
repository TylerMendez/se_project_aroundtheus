import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector("form");
    this._inputList = Array.from(this._form.querySelectorAll("input"));
  }

  setEventListeners() {
    super.setEventListeners();  // Calls the parent Popup setEventListeners method for closing behavior
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = this._getInputValues(); // Gather form input data
      this._handleFormSubmit(formData); // Pass data to the callback function
      this.close(); // Close the modal after submit
    });
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach(input => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }
}
