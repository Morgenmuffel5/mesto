
//ПЕРЕМЕННЫЕ

export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
} //объект для включения валидации форм

const buttonsCloseList = document.querySelectorAll('.popup__close-button');//все кнопки закрытия
export const popupAvatarForm = document.querySelector('.popup__form_avatar')
export const avatar = document.querySelector('.profile__avatar')
//переменные popup изменения профиля
export const profileChangeButton = document.querySelector('.profile__change-button');//кнопка изменения профайла
const popupEditProfile = document.querySelector('.popup_open_edit-profile'); // секция popup
export const popupInputName = document.querySelector('.popup__input_value_name');//поле ввода имени в форме
export const profileName = document.querySelector('.profile__name'); // поле имени в секции profile
export const popupInputAbout = document.querySelector('.popup__input_value_about'); //поле ввода инфо о себе в форме
const profileAbout = document.querySelector('.profile__specialization');// поле инфо о себе в секции profile
const profileCloseButton = document.querySelector('.popup__close-button_close_profile-change');//кнопка закрыть
export const popupProfileForm = document.querySelector('.popup__form_change_profile');//сама форма
export const profilePhoto = document.querySelector('.profile__photo')

//переменные popup добавления карточки
const popupCard = document.querySelector('.popup_open_add-card'); // секция попап добавления карточки
export const buttonCard = document.querySelector('.profile__add-button'); //кнопка добавления карточки
const buttonCardPopupClose = document.querySelector('.popup__close-button_close_add-card') //кнопка закрытия попапа добавления карточек
export const formCard = document.querySelector('.popup__form_change_add-card')//форма попапа добавления карточек
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