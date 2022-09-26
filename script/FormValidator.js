

export class FormValidator {


    constructor(config, form) {
        this._form = form;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
    }

    enableValidation() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })

        this._setEventListener(this._form, this._inputSelector, this._submitButtonSelector, this._inputErrorClass); //вызываем функцию, которая повесит обработчики на все поля ввода в форме
    }


//метод показа ошибки
_showError(errorElement, errorMessage, formInputElement) {
    errorElement.textContent = errorMessage; //задаем текст ошибки
    formInputElement.classList.add(this._inputErrorClass); //добавляем инпуту класс, чтобы реализовать красную границу
}

//метод скрытия ошибки
_hideError(errorElement, formInputElement) {
    errorElement.textContent = "";
    formInputElement.classList.remove(this._inputErrorClass); //удаляем инпуту класс, чтобы реализовать красную границу
}

//метод проверки валидности поля инпута
_toggleInputError(form, formInputElement) {
    const errorElement = form.querySelector(`.${formInputElement.id}-error`); //находим span с ошибки

    if (!formInputElement.validity.valid) {
        this._showError(errorElement, formInputElement.validationMessage, formInputElement);
    } else {
        this._hideError(errorElement, formInputElement);
    }
}

//метод проверки на валидность всех полей формы
_hasInvalidUnput(inputList) {
    return inputList.some((formInputElement) => {
        return !formInputElement.validity.valid
    })

}

//метод изменения состояния кнопки
_toggleSubmitButtonState(inputList, submitButton) {
    if (this._hasInvalidUnput(inputList)) {
        submitButton.setAttribute('disabled', true);
        submitButton.classList.add(this._inactiveButtonClass);
    } else {
        submitButton.removeAttribute('disabled');
        submitButton.classList.remove(this._inactiveButtonClass)
    }
}

//метод добавления обработчиков всем полям формы
_setEventListener(form, formInput, submitButton, inputErrorClass) {
    const inputList = Array.from(form.querySelectorAll(formInput)); //создаем массив из всех элементов input в форме
    const submitFormButton = form.querySelector(submitButton);//кнопка сохранения

    this._toggleSubmitButtonState(inputList, submitFormButton);//вызываем неактивное состояние, чтобы кнопка была еактивна при открытии

    inputList.forEach((formInputElement) => {
        formInputElement.addEventListener('input', () => {
            this._toggleInputError(form, formInputElement, inputErrorClass);
            this._toggleSubmitButtonState(inputList, submitFormButton);
        })
    })
}
}
