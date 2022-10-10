import { Card } from "./script/Card.js";
import { FormValidator } from "./script/FormValidator.js";
import { PopupWithImage } from "./script/PopupWithImage.js";
import { PopupWithForm } from "./script/PopupWithForm.js";
import { UserInfo } from "./script/UserInfo.js";
import './pages/index.css';
import {Section} from './script/Section.js'



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

const formList = Array.from(document.querySelectorAll(validationConfig.formSelector))




//ФУНКЦИИ 
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

   

//создаем объект валидации
const formValidation = {};

formList.forEach((form) => {
    const validation = new FormValidator(validationConfig, form);

  const formName = form.getAttribute("name");

  formValidation[formName] = validation;

  validation.enableValidation();
  });




//добавление массива на страницу

const cardList = new Section (
    {
        items: initialCards,
        render: (cardItem) => {
            const card = createCard(cardItem.name, cardItem.link);
            cardList.addItem(card);
        }
    },

    '.cards__list'
);

cardList.setItems();



//функция создания новой карточки
function createCard(cardName, imageLink) {
    const popupImg = new PopupWithImage('.popup_open_image', imageLink, cardName)
    const newCardItem = new Card('#tamlate-card', cardName, imageLink,
    {
        handleCardClick: (cardName, imageLink) => {
            popupImg.openPopup(cardName, imageLink)
        } 
    }).getCard();

    return newCardItem;
}

//попап создания новой карточки
const newCardPopup = new PopupWithForm ({
    popupSelector: '.popup_open_add-card',
    submitForm: (inputValues) => {
       /*  const popupWithImg = new PopupWithImage('.popup_open_image');
        const card = new Card ('#tamlate-card', inputValues.place, inputValues.link, {
            handleCardClick: (cardName, imageLink) => {
                popupWithImg.openPopup(cardName, imageLink)
            }
        });
        const cardElement = card.getCard(); */
        const cardElement = createCard(inputValues.place, inputValues.link)
        cardList.addItem(cardElement)
        newCardPopup.closePopup();
    }
})

newCardPopup.setEventListeners();

//попап с картинкой
const popupWithImg = new PopupWithImage('.popup_open_image');
popupWithImg.setEventListeners();

//попап с профайлом
const profilePopup = new PopupWithForm ({
    popupSelector: '.popup_open_edit-profile',
    submitForm: (inputValues) => {
        const newUserInfo = new UserInfo ('.profile__name', '.profile__specialization');
        newUserInfo.setUserInfo(inputValues);
        profilePopup.closePopup();
    }
    })
 

profilePopup.setEventListeners()

//инфо профайла
const user = new UserInfo ('.profile__name', '.profile__specialization');

//СОБЫТИЯ
//открытие попапов
buttonCard.addEventListener('click', function () {
    formValidation[popupCard.querySelector(".popup__form").getAttribute("name")].disableSummitButton(); //открытие попапа добавления карточки
    formValidation[popupCard.querySelector(".popup__form").getAttribute("name")].resetValidation()
    newCardPopup.openPopup();
})

profileChangeButton.addEventListener('click', () => {
    formValidation[popupEditProfile.querySelector(".popup__form").getAttribute("name")].disableSummitButton();
    formValidation[popupEditProfile.querySelector(".popup__form").getAttribute("name")].resetValidation()
    user.getUserInfo();
    profilePopup.openPopup()
}); //открытие попапа редактирования профиля

