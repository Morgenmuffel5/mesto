import { closePopup } from "../script/index.js";
import { closePopupByClick } from "../script/index.js";



export class FormValidator {


    constructor(config, form, popup, submitForm) {
        this._form = form;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
        this._bottonSubmitElement = this._form.querySelector(this._submitButtonSelector)
        this._popup = popup;
        this._submitForm = submitForm;
     
    }

    enableValidation() {
        this._setEventListener(); //вызываем функцию, которая повесит обработчики на все поля ввода в форме
    }


    //метод показа ошибки
    _showError(formInputElement) {
        const errorElement = this._form.querySelector(`.${formInputElement.id}-error`);
        errorElement.textContent = formInputElement.validationMessage; //задаем текст ошибки
        formInputElement.classList.add(this._inputErrorClass); //добавляем инпуту класс, чтобы реализовать красную границу
    }

    //метод скрытия ошибки
    _hideError(formInputElement) {
        const errorElement = this._form.querySelector(`.${formInputElement.id}-error`);
        errorElement.textContent = "";
        formInputElement.classList.remove(this._inputErrorClass); //удаляем инпуту класс, чтобы реализовать красную границу
    }

    //метод проверки валидности поля инпута
    _isValid(formInputElement) {
        if (!formInputElement.validity.valid) {
            this._showError(formInputElement);
        } else {
            this._hideError(formInputElement);
        }
    }

    //метод проверки на валидность всех полей формы
    _hasInvalidUnput() {
        return this._inputList.some((formInputElement) => {
            return !formInputElement.validity.valid
        })

    }

    //метод изменения состояния кнопки
    _toggleSubmitButtonState() {
        if (this._hasInvalidUnput(this._inputList)) {
            this._bottonSubmitElement.setAttribute('disabled', true);
            this._bottonSubmitElement.classList.add(this._inactiveButtonClass);
        } else {
            this._bottonSubmitElement.removeAttribute('disabled');
            this._bottonSubmitElement.classList.remove(this._inactiveButtonClass)
        }
    }

    _resetForm() {
        const errorElementList = Array.from(this._form.querySelectorAll('.popup__error'));

        errorElementList.forEach((erEl) => {
            erEl.textContent = "";
        })

        this._inputList.forEach((formInput) => {
            formInput.classList.remove(this._inputErrorClass);
        })

        this._form.reset();

    }




    //метод добавления обработчиков всем полям формы
    _setEventListener() {

        this._toggleSubmitButtonState();//вызываем неактивное состояние, чтобы кнопка была еактивна при открытии

        this._inputList.forEach((formInputElement) => {
            formInputElement.addEventListener('input', () => {
                this._isValid(formInputElement);
                this._toggleSubmitButtonState();
            })
        })

        this._popup.addEventListener('click', (evt) => {
            if (evt.target == evt.currentTarget || evt.target.classList.contains('popup__close-button')) {
                this._resetForm();
                this._toggleSubmitButtonState()
                closePopup(this._popup);
            }
        })

        this._form.addEventListener('submit', (evt) => {
            this._submitForm(evt)
            this._resetForm();
            this._toggleSubmitButtonState();
        })


    }
}
