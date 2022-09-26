import {Card} from "../script/Card.js";
import { FormValidator } from "../script/FormValidator.js";

//ПЕРЕМЕННЫЕ

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
} //объект для включения валидации форм

const closePopupButtons = document.querySelectorAll('.popup__close-button');//все кнопки закрытия

//переменные popup изменения профиля
const profileChangeButton = document.querySelector('.profile__change-button');//кнопка изменения профайла
const popupEditProfile = document.querySelector('.popup_open_edit-profile'); // секция popup
const popupInputName = document.querySelector('.popup__input_value_name');//поле ввода имени в форме
const profileName = document.querySelector('.profile__name'); // поле имени в секции profile
const popupInputAbout = document.querySelector('.popup__input_value_about'); //поле ввода инфо о себе в форме
const profileAbout = document.querySelector('.profile__specialization');// поле инфо о себе в секции profile
const profileCloseButton = document.querySelector('.popup__close-button_close_profile-change');//кнопка закрыть
const popupProfileForm = document.querySelector('.popup__form_change_profile');//сама форма

//переменные popup добавления карточки
const addCardPopup = document.querySelector('.popup_open_add-card'); // секция попап добавления карточки
const addCardButton = document.querySelector('.profile__add-button'); //кнопка добавления карточки
const addCardButtonClose = document.querySelector('.popup__close-button_close_add-card') //кнопка закрытия попапа добавления карточек
const addCardForm = document.querySelector('.popup__form_change_add-card')//форма попапа добавления карточек
const cardsList = document.querySelector('.cards__list'); // список карточек
const addCardTemplate = document.querySelector('#tamlate-card').content //заготовка карточки
const newCardName = document.querySelector('.popup__input_value_place-name');//поле ввода имени места
const newCardLink = document.querySelector('.popup__input_value_img');//поле ввода ссылки

//переменные Popup открытия фото
/* const imgPopup = document.querySelector('.popup_open_image');//попап открытия фото
const popupImgCloseButton = document.querySelector('.popup__close-button_close_image');//кнопка закрытия попап
const popupPhoto = document.querySelector('.popup__img'); //картинка в попапе
const popupCaption = document.querySelector('.popup__caption');// подпись картинки в попапе */




//ФУНКЦИИ 

//функция добавления массива на страницу
function addCardsFromArr() {
    const initialCards = [ //Массив с карточками
        {
            name: 'Архыз',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
        },
        {
            name: 'Челябинская область',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
        },
        {
            name: 'Иваново',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
        },
        {
            name: 'Камчатка',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
        },
        {
            name: 'Холмогорский район',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
        },
        {
            name: 'Байкал',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
        }
    ];

    initialCards.forEach(function (item) { //перебираем элементы и добавляем на страницу
    
        const cardItem = new Card('#tamlate-card', item.name, item.link);
        cardsList.prepend(cardItem.getCard()); //cardList - список карточек
    })
}

addCardsFromArr(); //вывод массива на страницу
    



//функция закрытия по Esc
 const closePopupOnEsc = (evt) => { 
    if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
                closePopup(openedPopup); 
            }
    }  


//Общая функция простого закрытия попапов
 function closePopup(popup) {
    popup.classList.remove('popup_opened');

    resetFormAndError(popup, validationConfig);//очищаем форму и ошибки при закрытии без сохранения

    document.removeEventListener('keydown', closePopupOnEsc);
    
} 

//Общая функция открытия попапов
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupOnEsc);

}
 



//функция закрытия по overlay и кнопке закрытия
 const closePopupByClick = () => {
    const popupList = Array.from(document.querySelectorAll('.popup')); //массив всех popup

    popupList.forEach((popup) => {
        popup.addEventListener('click', (evt) => {
            if (evt.target == evt.currentTarget ||  evt.target.classList.contains('popup__close-button')) {
                closePopup(evt.currentTarget);
            }
        })
    })
}
closePopupByClick(); 


 function fillProfilePopupInputs() {
    popupInputName.value = profileName.textContent; // присваиваем value полю формы, равное значению имени пользователя
    popupInputAbout.value = profileAbout.textContent;// присваиваем value полю формы, равное значению инфо о себе
    openPopup(popupEditProfile);
} 


//функция сохранения данных в форме изменения профиля
 function submitFormPopupProfile(evt) {
    evt.preventDefault();
    const currentPopup = evt.target.closest('.popup');

    profileName.textContent = popupInputName.value;
    profileAbout.textContent = popupInputAbout.value;

    closePopup(currentPopup)//закрыть форму
} 


//функция создания новой карточки
function createCard(templateSelector, cardName, imageLink) {

    const newCardItem = new Card(templateSelector, cardName, imageLink).getCard();

    return newCardItem;
}


//добавление новой карточки на страницу
function submitFormPopupAddCard(evt) {
    evt.preventDefault();
    const popup = evt.target.closest('.popup');

    cardsList.prepend(createCard('#tamlate-card', newCardName.value, newCardLink.value));
    
    closePopup(popup)//закрыть форму
}


//функция сброса формы
const resetForm = (form) => {
    form.reset();
}

//функция сброса ошибок
const resetError = (errorList, inputList, config) => {
    errorList.forEach((errorElement) => {
        errorElement.textContent = "";
    })

    inputList.forEach((formInput) => {
        formInput.classList.remove(config.inputErrorClass);
    })
}

//функция очистки полей и ошибок если в попапе есть форма
const resetFormAndError = (popup, config) => {
    const submitButton = popup.querySelector(config.submitButtonSelector);// кнопка сохранения
    const form = popup.querySelector(config.formSelector); //ищем форму в указанном попапе

    if (popup.querySelector(config.formSelector)) {//сброс формы и ошибок, если форма есть
        const errorList = Array.from(form.querySelectorAll('.popup__error'));//создаем массив ошибок в указанной форме
        const inputList = Array.from(form.querySelectorAll(config.inputSelector));//создаем массив всех инпутов в форме
        resetError(errorList, inputList, config); //сбрасываем все ошибки
        resetForm(form); //сбрасываем поля формы
        
        /* toggleSubmitButtonState(inputList, submitButton, config.inactiveButtonClass); */

    }
}

/* //вызов валидации форм
enableValidation(validationConfig); */

const validProfileForm = new FormValidator(validationConfig, popupProfileForm)
validProfileForm.enableValidation();

const validAddCardForm = new FormValidator(validationConfig, addCardForm);
validAddCardForm.enableValidation();



//СОБЫТИЯ
//открытие попапов
addCardButton.addEventListener('click', function () { //открытие попапа добавления карточки
    openPopup(addCardPopup)
});

profileChangeButton.addEventListener('click', fillProfilePopupInputs); //открытие попапа редактирования профиля

//сохранение введенных пользователем данных
popupProfileForm.addEventListener('submit', submitFormPopupProfile); //сохранить данные редактирования профиля

addCardForm.addEventListener('submit', submitFormPopupAddCard)//сохранение новой карточки

