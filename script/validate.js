//функция показа ошибки
const showInputError = (form, formInputElement, errorMessage) => {
    const errorElement = form.querySelector(`.${formInputElement.id}-error`); //находим span с ошибки

    errorElement.textContent = errorMessage; //задаем текст ошибки
    errorElement.classList.add('popup__error_active'); //добавляем span класс, который сделает ошибку видимой

}

//функция, скрывающая ошибку
const hideInputError = (form, formInputElement) => {
    const errorElement = form.querySelector(`.${formInputElement.id}-error`);

    errorElement.classList.remove('popup__error_active'); //убираем span класс, который сделает ошибку видимой
}


//функция, проверяющая валидность
const isValidForm = (form, formInputElement) => {
    if (!formInputElement.validity.valid) {
        showInputError(form, formInputElement, formInputElement.validationMessage)
    } else {
        hideInputError(form, formInputElement);
    }
}

//функция, добавляющая обработчики всем полям формы
const setEventListenerForAllInput = (form) => {
    const inputList = Array.from(form.querySelectorAll('.popup__input')); //создаем массив из всех элементов input в форме

    inputList.forEach((formInputElement) => {
        formInputElement.addEventListener('input', () => {
            isValidForm(form, formInputElement)
        })
    })
}

//функция добавления валидации всем формам
const isValidAllForms = () => {
    const formList = Array.from(document.forms); //получаем массив из всех форм на странице

    formList.forEach((form) => {    //отменяем стандартное поведение для всех форм
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })

        setEventListenerForAllInput(form); //вызываем функцию, которая повесит обработчики на все поля ввода в форме
    })
}

isValidAllForms(); //вызываем функцию валидации для всех форм
