
//функция показа ошибки
const showInputError = (formInputElement, errorMessage, errorElement, inputErrorClass) => {

    errorElement.textContent = errorMessage; //задаем текст ошибки
    formInputElement.classList.add(inputErrorClass); //добавляем инпуту класс, чтобы реализовать красную границу

}

//функция, скрывающая ошибку
const hideInputError = (formInputElement, errorElement, inputErrorClass) => {

    errorElement.textContent = "";
    formInputElement.classList.remove(inputErrorClass); //удаляем инпуту класс, чтобы реализовать красную границу
}


//функция, проверяющая валидность
const toggleInputError = (form, formInputElement, inputErrorClass) => {
    const errorElement = form.querySelector(`.${formInputElement.id}-error`); //находим span с ошибки

    if (!formInputElement.validity.valid) {
        showInputError(formInputElement, formInputElement.validationMessage, errorElement, inputErrorClass);
    } else {
        hideInputError(formInputElement, errorElement, inputErrorClass);
    }
}


//функция проверки на валидность всех полей
const hasInvalidInput = (inputList) => {
    return inputList.some((formInputElement) => {
        return !formInputElement.validity.valid
    })
}

//функция изменения состояния кнопки
const toggleSubmitButtonState = (inputList, submitButton, inactiveButtonClass) => {
    if (hasInvalidInput(inputList)) {
        submitButton.setAttribute('disabled', true);
        submitButton.classList.add(inactiveButtonClass);
    } else {
        submitButton.removeAttribute('disabled');
        submitButton.classList.remove(inactiveButtonClass)
    }
}

//функция, добавляющая обработчики всем полям формы
const setEventListener = (form, formInput, submitButton, inactiveButtonClass, inputErrorClass) => {
    const inputList = Array.from(form.querySelectorAll(formInput)); //создаем массив из всех элементов input в форме
    const submitFormButton = form.querySelector(submitButton);//кнопка сохранения

    toggleSubmitButtonState(inputList, submitFormButton, inactiveButtonClass);//вызываем неактивное состояние, чтобы кнопка была еактивна при открытии

    inputList.forEach((formInputElement) => {
        formInputElement.addEventListener('input', () => {
            toggleInputError(form, formInputElement, inputErrorClass);
            toggleSubmitButtonState(inputList, submitFormButton, inactiveButtonClass);
        })
    })
}




const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector)); //получаем массив из всех форм на странице

    formList.forEach((form) => {    //отменяем стандартное поведение для всех форм
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })

        setEventListener(form, config.inputSelector, config.submitButtonSelector, config.inactiveButtonClass, config.inputErrorClass); //вызываем функцию, которая повесит обработчики на все поля ввода в форме
    })
}


//функция сброса формы
const resetForm = (form) => {
    form.reset();
}

//функция сброса ошибок
const resetError = (errorList, inputList) => {
    errorList.forEach((errorElement) => {
        errorElement.textContent = "";
    })

    inputList.forEach((formInput) => {
        formInput.classList.remove('popup__input_type_error');
    })
}

//функция очистки полей и ошибок если в попапе есть форма
const resetFormAndError = (popup) => {
    const submitButton = popup.querySelector('.popup__button');// кнопка сохранения
    const form = popup.querySelector('.popup__form'); //ищем форму в указанном попапе

    if (popup.querySelector('.popup__form')) {//сброс формы и ошибок, если форма есть
        const errorList = Array.from(form.querySelectorAll('.popup__error'));//создаем массив ошибок в указанной форме
        const inputList = Array.from(form.querySelectorAll('.popup__input'));//создаем массив всех инпутов в форме
        resetError(errorList, inputList); //сбрасываем все ошибки
        resetForm(form); //сбрасываем поля формы
        
        toggleSubmitButtonState(inputList, submitButton, 'popup__button_disabled');

    }
}
