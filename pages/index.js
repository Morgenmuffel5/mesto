//открытие
let profileChangeButton = document.querySelector('.profile_change-button');


function popupOpen() {
    let popup = document.querySelector('.popup');
   return popup.classList.add('popup_opened');
}

profileChangeButton.addEventListener('click', popupOpen);

//закрытие

let profileCloseButton = document.querySelector('.popup__close-button');

function popupClose() {
    let popup = document.querySelector('.popup');
    return popup.classList.remove('popup_opened');
}

profileCloseButton.addEventListener('click', popupClose);

// заполнение поля ввода имени текстом, который уже есть на странице
let popupInputName = document.querySelector('.popup__input-name');
let profileName = document.querySelector('.profile__name');

popupInputName.value = profileName.textContent;

//заполнение поля ввода о себе текстом, который уже есть на странице

let popupInputAbout = document.querySelector('.popup__input-about');
let profileAbout = document.querySelector('.profile__specialization');

popupInputAbout.value = profileAbout.textContent;


//сохранение данных введенных пользователем
let popupForm = document.querySelector('.popup__form');

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileName.textContent = popupInputName.value;
    profileAbout.textContent = popupInputAbout.value;
}

popupForm.addEventListener('submit', formSubmitHandler); 

//Закрытие popup при нажатии кнопки сохранить

let popupSaveButton = document.querySelector('.popup__save-button');

popupSaveButton.addEventListener('click', popupClose);