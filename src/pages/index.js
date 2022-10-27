import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupDeleter } from "../components/PopupDeleter.js";
export { Api } from "../components/Api.js";
import './index.css';
import { Section } from '../components/Section.js'
import { Api } from "../components/Api.js";



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
const popupAvatarForm = document.querySelector('.popup__form_avatar')
const avatar = document.querySelector('.profile__avatar')
//переменные popup изменения профиля
const profileChangeButton = document.querySelector('.profile__change-button');//кнопка изменения профайла
const popupEditProfile = document.querySelector('.popup_open_edit-profile'); // секция popup
const popupInputName = document.querySelector('.popup__input_value_name');//поле ввода имени в форме
const profileName = document.querySelector('.profile__name'); // поле имени в секции profile
const popupInputAbout = document.querySelector('.popup__input_value_about'); //поле ввода инфо о себе в форме
const profileAbout = document.querySelector('.profile__specialization');// поле инфо о себе в секции profile
const profileCloseButton = document.querySelector('.popup__close-button_close_profile-change');//кнопка закрыть
const popupProfileForm = document.querySelector('.popup__form_change_profile');//сама форма
const profilePhoto = document.querySelector('.profile__photo')

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

let currentUserId = '';




//ФУНКЦИИ 


const validationProfileForm = new FormValidator(validationConfig, popupProfileForm);
validationProfileForm.enableValidation()

const validationCardForm = new FormValidator(validationConfig, formCard);
validationCardForm.enableValidation();

const validationAvatarForm = new FormValidator(validationConfig, popupAvatarForm);
validationAvatarForm.enableValidation()

//объект api
const api = new Api();


//попап с картинкой
const popupWithImg = new PopupWithImage('.popup_open_image');
popupWithImg.setEventListeners();


//инфо профайла
const user = new UserInfo('.profile__name', '.profile__specialization', '.profile__photo');


api.getUserInfo().then(response => {
    //добавление массива на страницу
    currentUserId = response._id;
api.getInitialCards().then(response => {
    const initialCards = response;
    const cardList = new Section(
        {
            items: initialCards,
            render: (cardItem) => {

                const card = createCard(cardItem.name, cardItem.link, cardItem, currentUserId);
                cardList.addItem(card);
            }
        },

        '.cards__list'
    );

    cardList.setItems();
})

    user.setUserInfo({
        name: response.name,
        about: response.about
    });
    profilePhoto.src = response.avatar
})



//попап удаления карточки
const popupDeleter = new PopupDeleter('.popup_delete', {
    handleDeleteCard: (card) => {
        api.deleteCard(card).then(response => {
            console.log(response)
            
        })
    }
})

popupDeleter.setEventListeners();







//функция создания новой карточки
function createCard(cardName, imageLink, card, currentUserId) {
    const newCardItem = new Card('#tamlate-card', cardName, imageLink,
        {
            handleCardClick: (cardName, imageLink) => {
                popupWithImg.openPopup(cardName, imageLink)
            },
            handleAddLike: (currentCard) => {
                api.addLike(card).then(response => {
                    currentCard.setLikeInfo(response)
                })
            },
            handleRemoveLike: (currentCard) => {
                api.removeLike(card).then(response => {
                    currentCard.setLikeInfo(response)
                })
            },
            handleOpenDelete: (card) => {
                popupDeleter.openPopup(card);
            }
        }, card, '.cards__like-rating', currentUserId).getCard();

    return newCardItem;
}

//попап создания новой карточки
const newCardPopup = new PopupWithForm({
    popupSelector: '.popup_open_add-card',
    submitForm: (inputValues) => {
        api.addNewCard(inputValues).then(response => {
            newCardPopup.finishSubmit()
            const section = new Section({
                items: response,
                render: () => { }
            },
                '.cards__list')
            const cardElement = createCard(response.name, response.link, response,currentUserId);
            section.addItem(cardElement)
            newCardPopup.closePopup();
        })
    }
})

newCardPopup.setEventListeners();

//попап смены аватара
const avatarPopup = new PopupWithForm({
    popupSelector: '.popup_avatar',
    submitForm: (inputValues) => {
        api.changeAvatar(inputValues).then(response => {
            avatarPopup.finishSubmit()
            user.changeAvatar(response)
        })
        avatarPopup.closePopup()
    }
})
avatarPopup.setEventListeners();


//попап с профайлом
const profilePopup = new PopupWithForm({
    popupSelector: '.popup_open_edit-profile',
    submitForm: (inputValues) => {
        api.saveNewUserInfo(inputValues).then(response => {
            profilePopup.finishSubmit();
            user.setUserInfo(response);
        })
        profilePopup.closePopup();
    }
})


profilePopup.setEventListeners()

function setUserInfo({ userName, infoAbout }) {
    popupInputName.value = userName;
    popupInputAbout.value = infoAbout;
}

//СОБЫТИЯ
//открытие попапов
buttonCard.addEventListener('click', function () {
    validationCardForm.disableSummitButton(); //открытие попапа добавления карточки
    validationCardForm.resetValidation()
    newCardPopup.openPopup();
})

profileChangeButton.addEventListener('click', () => {
    validationProfileForm.disableSummitButton();
    validationProfileForm.resetValidation()
    setUserInfo(user.getUserInfo());
    profilePopup.openPopup()
}); //открытие попапа редактирования профиля

avatar.addEventListener('click', () => {
    validationAvatarForm.disableSummitButton();
    validationAvatarForm.resetValidation();
    avatarPopup.openPopup();
})

