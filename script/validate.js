//объект совсеми нужными классами
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}


//функция показа ошибки
const showInputError = (formInputElement, errorMessage, config, errorElement) => {

    errorElement.textContent = errorMessage; //задаем текст ошибки
    formInputElement.classList.add(config.inputErrorClass); //добавляем инпуту класс, чтобы реализовать красную границу

}

//функция, скрывающая ошибку
const hideInputError = (formInputElement, config, errorElement) => {

    errorElement.textContent = "";
    formInputElement.classList.remove(config.inputErrorClass); //удаляем инпуту класс, чтобы реализовать красную границу
}


//функция, проверяющая валидность
const isValidForm = (form, formInputElement) => {
    const errorElement = form.querySelector(`.${formInputElement.id}-error`); //находим span с ошибки

    if (!formInputElement.validity.valid) {
        showInputError(formInputElement, formInputElement.validationMessage, validationConfig, errorElement);
    } else {
        hideInputError(formInputElement, validationConfig, errorElement);
    }
}



//функция проверки на валидность всех полей
const hasInvalidInput = (inputList) => {
    return inputList.some((formInputElement) => {
        return !formInputElement.validity.valid
    })
}


//функция изменения состояния кнопки
const toggleSubmitButtonState = (inputList, submitButton, config) => {
    if (hasInvalidInput(inputList)) {
        submitButton.setAttribute('disabled', true);
        submitButton.classList.add(config.inactiveButtonClass);
    } else {
        submitButton.removeAttribute('disabled');
        submitButton.classList.remove(config.inactiveButtonClass)
    }
}


//функция, добавляющая обработчики всем полям формы
const setEventListener = (form, config) => {
    const inputList = Array.from(form.querySelectorAll(config.inputSelector)); //создаем массив из всех элементов input в форме
    const submitFormButton = form.querySelector(config.submitButtonSelector);//кнопка сохранения

    toggleSubmitButtonState(inputList, submitFormButton, validationConfig);//вызываем неактивное состояние, чтобы кнопка была еактивна при открытии

    inputList.forEach((formInputElement) => {
        formInputElement.addEventListener('input', () => {
            isValidForm(form, formInputElement);
            toggleSubmitButtonState(inputList, submitFormButton, validationConfig);
        })
    })
}


const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector)); //получаем массив из всех форм на странице

    formList.forEach((form) => {    //отменяем стандартное поведение для всех форм
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })

        setEventListener(form, validationConfig); //вызываем функцию, которая повесит обработчики на все поля ввода в форме
    })
}

enableValidation(validationConfig);
