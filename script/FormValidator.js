
export class FormValidator {
    _form;
    _formInputElement;
    _submitButton;
    _submitButtonDisable;
    _inputErrorClass;
    _errorElement;
    _errorMessage;
    _inputList;
    

    constructor(config, form) {
        this._form = form;
        this._formInputElement = this._form.querySelector(config.inputSelector);
        this._submitButton = this._form.querySelector(config.submitButtonSelector);
        this._submitButtonDisable = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        
        this._errorMessage = this._formInputElement.validationMessage;
        this._inputList = Array.from(this._form.querySelectorAll(config.inputSelector));
        
  
    }

    enableValidation() {
    this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
    })
    this._setEventListener();
}
   

    //метод показа ошибки
    _showError(errorElement) {
        errorElement.textContent = this._errorMessage; //задаем текст ошибки
         this._formInputElement.classList.add(this._inputErrorClass); //добавляем инпуту класс, чтобы реализовать красную границу
    }

    //метод скрытия ошибки
    _hideError(errorElement) {
        errorElement.textContent = "";
        this._formInputElement.classList.remove(this._inputErrorClass); //удаляем инпуту класс, чтобы реализовать красную границу
    }

    //метод проверки валидности поля инпута
    _checkValidity() {
        const errorElement = this._form.querySelector(`.${this._formInputElement.id}-error`);
        if (!this._formInputElement.validity.valid) {
            this._showError(errorElement);
        } else {
            this._hideError(errorElement);
        }
    }

    //метод проверки на валидность всех полей формы
    _hasInvalidUnput() {
        return this._inputList.some((element) => {
            return !element.validity.valid;
        })
    }

    //метод изменения состояния кнопки
    _toggleSubmitButtonState() {
        if (this._hasInvalidUnput()) {
            this._submitButton.setAttribute('disabled', true);
            this._submitButton.classList.add(this._submitButtonDisable);
        } else {
            this._submitButton.removeAttribute('disabled');
            this._submitButton.classList.remove(this._submitButtonDisable)
        }
    }

    //метод добавления обработчиков всем полям формы
    _setEventListener() {
        this._toggleSubmitButtonState();//вызываем неактивное состояние, чтобы кнопка была не активна при открытии

        this._inputList.forEach((element) => {
            element.addEventListener('input', () => {
                this._checkValidity();
                this._toggleSubmitButtonState();
            })
        })
    }

}