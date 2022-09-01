//ПЕРЕМЕННЫЕ
const closePopupButtons = document.querySelectorAll('.popup__close-button');//все кнопки закрытия

//переменные popup изменения профиля
const profileChangeButton = document.querySelector('.profile__change-button');//кнопка изменения профайла
const popupEditProfile = document.querySelector('.popup_open_edit-profile'); // секция popup
const popupInputName = document.querySelector('.popup__input_value_name');//поле ввода имени в форме
const profileName = document.querySelector('.profile__name'); // поле имени в секции profile
const popupInputAbout = document.querySelector('.popup__input_value_about'); //поле ввода инфо о себе в форме
const profileAbout = document.querySelector('.profile__specialization');// поле инфо о себе в секции profile
const profileCloseButton = document.querySelector('.popup__close-button_close_profile-change');//кнопка закрыть
const popupForm = document.querySelector('.popup__form_change_profile');//сама форма

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
const imgPopup = document.querySelector('.popup_open_image');//попап открытия фото
const popupImgCloseButton = document.querySelector('.popup__close-button_close_image');//кнопка закрытия попап
const popupPhoto = document.querySelector('.popup__img'); //картинка в попапе
const popupCaption = document.querySelector('.popup__caption');// подпись картинки в попапе




//ФУНКЦИИ 

//функция добавления массива на страницу
function addCardsFromArr () {
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

    initialCards.forEach(function (item){ //перебираем элементы и добавляем на страницу
        const cardName = item.name;
        const cardLink = item.link;
        cardsList.prepend(createCard (cardName, cardLink));
    })
}

addCardsFromArr (); //вывод массива на страницу


//функция сброса формы
const resetForm = (form) => {
    form.reset();
}

//функция сброса ошибок
const resetError = (errorList) => {
    errorList.forEach((errorElement) => {
        errorElement.textContent = "";
    })
}

//функция добавления слушателя на событиt Esc
const addListenerEsc = (popup) => {
    document.addEventListener('keydown', (evt) => {
        if (evt.key === 'Escape') {
            closePopup(popup);
        }
    })
}

//функция удаления слушателя собития Esc
const removeListenerEsc = (popup) => {
    document.removeEventListener('keydown', (evt) => {
        if (evt.key === 'Escape') {
            closePopup(popup);
        }
    })
}

//Общая функция простого закрытия попапов
function closePopup (popup) {
    popup.classList.remove('popup_opened');
    const form = popup.querySelector('.popup__form'); //ищем форму в указанном попапе

    if (popup.querySelector('.popup__form')) {//сброс формы и ошибок, если форма есть
        const errorList = Array.from(form.querySelectorAll('.popup__error'));//создаем массив ошибок в указанной форме
    resetError(errorList); //сбрасываем все ошибки
    resetForm(form); //сбрасываем поля формы
    }
    removeListenerEsc(popup);
}
 
//Общая функция открытия попапов
function openPopup(popup) {
    popup.classList.add('popup_opened');

    addListenerEsc(popup);
}



//вешаем обработчики на все кнопки закрытия 
function addEventListenerForClosePopupButton() {
    closePopupButtons.forEach(function(item) {
        item.addEventListener('click', function(event) {
            const eventTarget = event.target.closest('.popup');
            closePopup (eventTarget);
        })
    })
}
addEventListenerForClosePopupButton();//вызываем, чтобы обработчики повисли

//функция закрытия по overlay
const closePopupByOverlay = () => {
    const popupList = Array.from(document.querySelectorAll('.popup')); //массив всех popup

    popupList.forEach((popup) => {
        popup.addEventListener('click', (evt) => {
            if (evt.target == evt.currentTarget) {
                closePopup(evt.currentTarget);
            }
        })
    })
}
closePopupByOverlay();


function addValueToInputProfile() {
    popupInputName.value = profileName.textContent; // присваиваем value полю формы, равное значению имени пользователя
    popupInputAbout.value = profileAbout.textContent;// присваиваем value полю формы, равное значению инфо о себе
    openPopup(popupEditProfile);
}


//функция сохранения данных в форме изменения профиля
function submitFormPopupProfile(evt) { 
    evt.preventDefault();
    const eventTarget = evt.target.closest('.popup');

    profileName.textContent = popupInputName.value;
    profileAbout.textContent = popupInputAbout.value;
    
    closePopup (eventTarget)//закрыть форму
}


//функция добавления карточек, здесь же удаление и лайки
function createCard (CardName, imgLink) {
    
    const addNewCardItem = addCardTemplate.querySelector('.cards__item').cloneNode(true);//клонируем заготовку */
    const cardImg = addNewCardItem.querySelector('.cards__img')// картинка в карточке
    const cardTitle = addNewCardItem.querySelector('.cards__title');//заголовок карточки
    const likeButton = addNewCardItem.querySelector('.cards__like-button');//кнопка лайк
    const deleteCardButton = addNewCardItem.querySelector('.card__delete-button');//кнопка удаления карточки*/

    cardImg.setAttribute('src', imgLink);//задаем значение src
    cardImg.setAttribute('alt', CardName);//задаем значение src
    cardTitle.textContent = CardName;//задае текст заголовка


    likeButton.addEventListener('click', function (event) {
        event.target.classList.toggle('cards__like-button_active'); //реализация лайка
    })

    deleteCardButton.addEventListener('click', function (event) {
        const eventTarget = event.target;
        const cardItem = eventTarget.closest('.cards__item');
        cardItem.remove(); //реализация удаления
    })

    cardImg.addEventListener('click', function (event) {
        const eventTarget = event.target;
        popupPhoto.setAttribute('src',eventTarget.src);
        popupPhoto.setAttribute('alt',eventTarget.alt);
        popupCaption.textContent = addNewCardItem.querySelector('.cards__title').textContent;
        openPopup(imgPopup);
    }) //открытие попапа картинки

    return addNewCardItem;
}


//добавление новой карточки на страницу
function submitFormPopupAddCard (evt) { 
    evt.preventDefault();
    const eventTarget = evt.target.closest('.popup');

    if (newCardName.value && newCardLink.value) {
    cardsList.prepend(createCard (newCardName.value, newCardLink.value));
    }

    closePopup (eventTarget)//закрыть форму
    evt.target.reset() 
}




    //СОБЫТИЯ
//открытие попапов
addCardButton.addEventListener('click', function () { //открытие попапа добавления карточки
    openPopup(addCardPopup)
});

profileChangeButton.addEventListener('click', addValueToInputProfile); //открытие попапа редактирования профиля*/
 
//сохранение введенных пользователем данных
popupForm.addEventListener('submit', submitFormPopupProfile); //сохранить данные редактирования профиля

addCardForm.addEventListener('submit', submitFormPopupAddCard)//сохранение новой карточки





