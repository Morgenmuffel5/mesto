



export class Section {
    constructor ({render}, container) {
        this._render = render;
        this._container = document.querySelector(container);
    }

    setItems(items) {
        items.forEach(item => {
            this._render(item);
        });
    }

    addItem(element) {
        this._container.prepend(element);
    }
}