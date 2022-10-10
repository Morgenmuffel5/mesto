
import { Popup } from "./Popup.js";


export class PopupWithForm extends Popup{


    constructor({popupSelector, submitForm}) {
        super(popupSelector);
        this._submitForm = submitForm;
        this._form = this._popup.querySelector('.popup__form');
        
    }

    _getInputValues() {
        const inputList = Array.from(this._form.querySelectorAll('.popup__input'));
        this._inputValues = {};
        inputList.forEach(input => {
            this._inputValues[input.name] = input.value;
        });

        return this._inputValues;
    }

    closePopup() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', (evt) => {
            super._handleEscClose(evt);
        })
        this._form.reset()
    }

    setEventListeners() {
        this._popup.addEventListener('click', (evt) => {
            if (evt.target == evt.currentTarget || evt.target.classList.contains('popup__close-button')) {
                this.closePopup()
            }
        })

        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitForm(this._getInputValues());
            this.closePopup;
        })
    }
}