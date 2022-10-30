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
import {popupAvatarForm} from "../components/utils/constants.js"
import {avatar} from "../components/utils/constants.js"
import {profileChangeButton} from "../components/utils/constants.js"
import {popupInputName} from "../components/utils/constants.js"
import {popupInputAbout} from "../components/utils/constants.js"
import {popupProfileForm} from "../components/utils/constants.js"
import {profilePhoto} from "../components/utils/constants.js"
import {buttonCard} from "../components/utils/constants.js"
import {formCard} from "../components/utils/constants.js"
import {validationConfig} from "../components/utils/constants.js"
import {} from "../components/utils/constants.js"



let currentUserId = '';
let cardDelete =''



//ФУНКЦИИ 


const validationProfileForm = new FormValidator(validationConfig, popupProfileForm);
validationProfileForm.enableValidation()

const validationCardForm = new FormValidator(validationConfig, formCard);
validationCardForm.enableValidation();

const validationAvatarForm = new FormValidator(validationConfig, popupAvatarForm);
validationAvatarForm.enableValidation()

//объект api
const api = new Api('https://nomoreparties.co/v1/cohort-52', 
{
    authorization: '32d71a68-3927-4155-9844-e97b16e8b4b1',
        'Content-Type': 'application/json'
});


//попап с картинкой
const popupWithImg = new PopupWithImage('.popup_open_image');
popupWithImg.setEventListeners();


//инфо профайла
const user = new UserInfo('.profile__name', '.profile__specialization', '.profile__photo');

//класс section

const cardList = new Section({
    render: (cardItem) => {
        const card = createCard(cardItem.name, cardItem.link, cardItem);
        cardList.addItem(card)
    },
},
'.cards__list')

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    user.setUserInfo({
        name: userData.name,
        about: userData.about
    });
    profilePhoto.src = userData.avatar
    currentUserId = userData._id;

    cardList.setItems(cards)
    /* const cardList = new Section(
        {
            items: cards,
            render: (cardItem) => {

                const card = createCard(cardItem.name, cardItem.link, cardItem, currentUserId);
                cardList.addItem(card);
            }
        },

        '.cards__list'
    ); */

    /* cardList.setItems(cards); */
  })
  .catch(err => {
    console.log(err)
  }); 



/*  api.getUserInfo().then(response => {
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

    cardList.setItems(response);
})

    user.setUserInfo({
        name: response.name,
        about: response.about
    });
    profilePhoto.src = response.avatar
}).catch(err => {
    console.log(err)
}) */



//попап удаления карточки
const popupDeleter = new PopupDeleter('.popup_delete', {
    handleDeleteCard: (card) => {
        api.deleteCard(card).then(response => {
            console.log(response)
            popupDeleter.closePopup();
            cardDelete.remove()
            
        }).catch(err => {
            console.log(err)
        })
    }
})

popupDeleter.setEventListeners();







//функция создания новой карточки
function createCard(cardName, imageLink, card) {
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
                cardDelete = newCardItem;

            }
        }, card, '.cards__like-rating', currentUserId).getCard()
        
    

    return newCardItem;
}

//попап создания новой карточки
const newCardPopup = new PopupWithForm({
    popupSelector: '.popup_open_add-card',
    submitForm: (inputValues) => {
        api.addNewCard(inputValues).then(response => {
            /* newCardPopup.finishSubmit() */
            /* const section = new Section({
                items: response,
                render: () => { }
            },
                '.cards__list') */
            const cardElement = createCard(response.name, response.link, response, currentUserId);
            cardList.addItem(cardElement)
            newCardPopup.closePopup();
        })
        .finally(() => {
            newCardPopup.finishSubmit()
        })
        .catch(err => {
            console.log(err)
        })
    }
})

newCardPopup.setEventListeners();

//попап смены аватара
const avatarPopup = new PopupWithForm({
    popupSelector: '.popup_avatar',
    submitForm: (inputValues) => {
        api.changeAvatar(inputValues).then(response => {
            /* avatarPopup.finishSubmit() */
            user.changeAvatar(response)
            avatarPopup.closePopup()
        }).catch(err => {
            console.log(err)
        })
        .finally(()=> {
            avatarPopup.finishSubmit()
        })
    }
})
avatarPopup.setEventListeners();


//попап с профайлом
const profilePopup = new PopupWithForm({
    popupSelector: '.popup_open_edit-profile',
    submitForm: (inputValues) => {
        api.saveNewUserInfo(inputValues).then(response => {
            /* profilePopup.finishSubmit(); */
            user.setUserInfo(response);
            profilePopup.closePopup();
        }).catch(err => {
            console.log(err)
        })
        .finally(() => {
            profilePopup.finishSubmit();
        })
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

