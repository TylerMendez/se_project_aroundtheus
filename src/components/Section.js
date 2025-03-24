export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
    if (!this._container) {
      throw new Error(`Container with selector ${containerSelector} not found`);
    }
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}