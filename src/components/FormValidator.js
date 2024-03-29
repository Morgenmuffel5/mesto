

export class FormValidator {


    constructor(config, form) {
        this._form = form;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
        this._bottonSubmitElement = this._form.querySelector(this._submitButtonSelector)
     
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
            this.disableSummitButton;
        } else {
            this._bottonSubmitElement.removeAttribute('disabled');
            this._bottonSubmitElement.classList.remove(this._inactiveButtonClass)
        }
    }
    

    //сброс ошибок
    resetValidation() {
        this._toggleSubmitButtonState()
        this._inputList.forEach((inputItem) => {
            this._hideError(inputItem);
            /* inputItem.textContent = "" */
        })
    } 

    //неактивность кнопки
    disableSummitButton() {
        this._bottonSubmitElement.setAttribute('disabled', true);
        this._bottonSubmitElement.classList.add(this._inactiveButtonClass);
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
    }
}
