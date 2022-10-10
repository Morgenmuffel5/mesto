
export class Section {
    constructor ({items, render}, container) {
        this._items = items;
        this._render = render;
        this._container = document.querySelector(container);
    }

    setItems() {
        this._items.forEach(item => {
            this._render(item);
        });
    }

    addItem(element) {
        this._container.prepend(element);
    }
}