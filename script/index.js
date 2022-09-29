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

const buttonsCloseList = document.querySelectorAll('.popup__close-button');//все кнопки закрытия

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
const popupCard = document.querySelector('.popup_open_add-card'); // секция попап добавления карточки
const buttonCard = document.querySelector('.profile__add-button'); //кнопка добавления карточки
const buttonCardPopupClose = document.querySelector('.popup__close-button_close_add-card') //кнопка закрытия попапа добавления карточек
const formCard = document.querySelector('.popup__form_change_add-card')//форма попапа добавления карточек
const cardContainer = document.querySelector('.cards__list'); // список карточек
const cardTemplate = document.querySelector('#tamlate-card').content //заготовка карточки
const newCardName = document.querySelector('.popup__input_value_place-name');//поле ввода имени места
const newCardLink = document.querySelector('.popup__input_value_img');//поле ввода ссылки

//переменные Popup открытия фото
const imgPopup = document.querySelector('.popup_open_image');//попап открытия фото
const popupImgCloseButton = document.querySelector('.popup__close-button_close_image');//кнопка закрытия попап
const popupPhoto = document.querySelector('.popup__img'); //картинка в попапе
const popupCaption = document.querySelector('.popup__caption');// подпись картинки в попапе




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

        const cardItem = createCard('#tamlate-card', item.name, item.link)

        cardContainer.prepend(cardItem); //cardList - список карточек
    })
}

addCardsFromArr(); //вывод массива на страницу
    



//функция закрытия по Esc
const closePopupOnEsc = (evt, popup) => { 
    if (evt.key === 'Escape') {
        closePopup(popup);  
        }
    }  


//Общая функция простого закрытия попапов
 export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', (evt) => {
        closePopupOnEsc(evt, popup)
    })
} 

//Общая функция открытия попапов
export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => {
        closePopupOnEsc(evt, popup)
    });
}



export const closePopupByClick = (evt, popup) => {
            if (evt.target == evt.currentTarget ||  evt.target.classList.contains('popup__close-button')) {
                closePopup(popup);
            }
        }



 function fillProfilePopupInputs() {
    popupInputName.value = profileName.textContent; // присваиваем value полю формы, равное значению имени пользователя
    popupInputAbout.value = profileAbout.textContent;// присваиваем value полю формы, равное значению инфо о себе
    openPopup(popupEditProfile);
} 


//функция сохранения данных в форме изменения профиля
 function submitFormPopupProfile(evt) {
    evt.preventDefault();
    
    profileName.textContent = popupInputName.value;
    profileAbout.textContent = popupInputAbout.value;

    closePopup(popupEditProfile)//закрыть форму
} 


//функция создания новой карточки
function createCard(templateSelector, cardName, imageLink, handleOpenPopup) {

    const newCardItem = new Card(templateSelector, cardName, imageLink, handleOpenPopup).getCard();

    return newCardItem;
}


//добавление новой карточки на страницу
function submitFormPopupAddCard(evt) {
    evt.preventDefault();
    const popup = evt.target.closest('.popup');

    cardContainer.prepend(createCard('#tamlate-card', newCardName.value, newCardLink.value));
    
    closePopup(popup)//закрыть форму
}



const validProfileForm = new FormValidator(validationConfig, popupProfileForm ,popupEditProfile, submitFormPopupProfile)
validProfileForm.enableValidation();

const validAddCardForm = new FormValidator(validationConfig, formCard, popupCard, submitFormPopupAddCard);
validAddCardForm.enableValidation();



//СОБЫТИЯ
//открытие попапов
buttonCard.addEventListener('click', function () { //открытие попапа добавления карточки
    openPopup(popupCard)
});

profileChangeButton.addEventListener('click', fillProfilePopupInputs); //открытие попапа редактирования профиля

imgPopup.addEventListener('click', (evt) => {
    closePopupByClick(evt, imgPopup)
})



