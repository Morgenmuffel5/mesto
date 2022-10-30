
import { Popup } from "./Popup.js";


export class PopupWithForm extends Popup{


    constructor({popupSelector, submitForm}) {
        super(popupSelector);
        this._submitForm = submitForm;
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
        this._submitButton = this._form.querySelector('.popup__button');
        this._submitButtonText = this._submitButton.textContent;
        
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
        super.openPopup();

    }

    closePopup() {
        super.closePopup()
        this._form.reset()
    }

    setEventListeners() {
        super.setEventListeners();
    
    this._form.addEventListener('submit', (evt) => {
        evt.preventDefault()
      
      this._submitButton.textContent = 'Сохранение...';
      this._submitForm(this._getInputValues())
        /* .then(() => this.close()) 
        .finally(() => {
          this._submitButton.textContent = initialText;
        }) */
    });
  }

        
   
}