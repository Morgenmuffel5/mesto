
export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    _handleEscClose (evt) {
        if (evt.key === 'Escape') {
            this.closePopup();
        }
    }

    openPopup() {
        this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => {
        this._handleEscClose(evt);
    })
    }

    closePopup() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', (evt) => {
            this._handleEscClose(evt);
        })
    }

    setEventListeners() {
        this._popup.addEventListener('click', (evt) => {
            if (evt.target == evt.currentTarget || evt.target.classList.contains('popup__close-button')) {
                this.closePopup()
            }
        })
    }
}