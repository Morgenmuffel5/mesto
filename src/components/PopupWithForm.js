
import { Popup } from "./Popup.js";


export class PopupWithForm extends Popup{


    constructor({popupSelector, submitForm}) {
        super(popupSelector);
        this._submitForm = submitForm;
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
        this._submitButton = this._form.querySelector('.popup__button')
        
    }

    _getInputValues() {
        this._inputValues = {};
        this._inputList.forEach(input => {
            this._inputValues[input.name] = input.value;
        });

        return this._inputValues;
    }

    startSubmit() {
        this._submitButton.textContent = 'Сохраняется'
    }

    finishSubmit() {
        this._submitButton.textContent = this._submitButtonText;
    }

    openPopup() {
        this._submitButtonText = this._submitButton.textContent;
        super.openPopup();

    }

    closePopup() {
        super.closePopup()
        this._form.reset()
    }

    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.startSubmit();
            this._submitForm(this._getInputValues());
            this.closePopup;
        })
    }
}