//объявление переменных
let profileChangeButton = document.querySelector('.profile__change-button');
let popup = document.querySelector('.popup'); // секция popup
let popupInputName = document.querySelector('.popup__input-name');//поле ввода имени в форме
let profileName = document.querySelector('.profile__name'); // поле имени в секции profile
let popupInputAbout = document.querySelector('.popup__input-about'); //поле ввода инфо о себе в форме
let profileAbout = document.querySelector('.profile__specialization');// поле инфо о себе в секции profile
let popupSaveButton = document.querySelector('.popup__save-button');//кнопка сохранить
let profileCloseButton = document.querySelector('.popup__close-button');//кнопка закрыть
let popupForm = document.querySelector('.popup__form');//сама форма

//ФУНКЦИИ
//открытие popup и заполнение полей данными, указанными в профайле
function popupOpen() {
    popupInputName.value = profileName.textContent; // присваиваем value полю формы, равное значению имени пользователя
    popupInputAbout.value = profileAbout.textContent;// присваиваем value полю формы, равное значению инфо о себе
    popup.classList.add('popup_opened');
}


//Закрытие попапа
function popupClose() { //функция простого закрытия
    popup.classList.remove('popup_opened');//удаление класса открытия попапа
}

function formSubmitHandler(evt) { //функция сохранения измененных значений value
    evt.preventDefault();
    profileName.textContent = popupInputName.value;
    profileAbout.textContent = popupInputAbout.value;
    popupClose();//закрыть форму
}
popupForm.addEventListener('submit', formSubmitHandler); //сохранить данные



    //СОБЫТИЯ
profileChangeButton.addEventListener('click', popupOpen); //открытие попапа
popupForm.addEventListener('submit', formSubmitHandler); //сохранить данные
profileCloseButton.addEventListener('click', popupClose)// просто закрыть форму




