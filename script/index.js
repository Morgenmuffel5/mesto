//открытие popup
let profileChangeButton = document.querySelector('.profile_change-button');

function popupOpen() {
    let popup = document.querySelector('.popup');
   return popup.classList.add('popup_opened');
}

profileChangeButton.addEventListener('click', popupOpen);


// заполнение полей данными, указанными в профайле
let popupInputName = document.querySelector('.popup__input-name');//поле ввода имени в форме
let profileName = document.querySelector('.profile__name'); // поле имени в секции profile
let popupInputAbout = document.querySelector('.popup__input-about'); //поле ввода инфо о себе в форме
let profileAbout = document.querySelector('.profile__specialization');// поле инфо о себе в секции profile

popupInputName.value = profileName.textContent; // присваиваем value полю формы, равное значению имени пользователя
popupInputAbout.value = profileAbout.textContent;// присваиваем value полю формы, равное значению инфо о себе


//Закрытие попапа

let popupSaveButton = document.querySelector('.popup__save-button');//кнопка сохранить
let profileCloseButton = document.querySelector('.popup__close-button');//кнопка закрыть

function popupClose() { //функция простого закрытия
    let popup = document.querySelector('.popup'); // секция popup
    return popup.classList.remove('popup_opened');//удаление класса открытия попапа
}

function closePopupAndSaveData () { //функция сохранения и закрытия
    let popupForm = document.querySelector('.popup__form');//сама форма
    
    function formSubmitHandler (evt) { //функция сохранения измененных значений value
        evt.preventDefault(); 
        profileName.textContent = popupInputName.value;
        profileAbout.textContent = popupInputAbout.value;
    }
    
    popupForm.addEventListener('submit', formSubmitHandler); //сохранить данные
    popupClose();//закрыть форму
    }

    //логика сохранения и закрытия
popupSaveButton.addEventListener('click', closePopupAndSaveData);//при нажатии сохранить, реализуется функция сохранения данных и закрытия формы
profileCloseButton.addEventListener('click', popupClose)// просто закрыть форму