//объявление переменных
//переменные popup изменения профиля
const profileChangeButton = document.querySelector('.profile__change-button');
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
const addNewCardItem = addCardTemplate.querySelector('.cards__item').cloneNode(true);//клонируем заготовку
/*const cardImg = addNewCardItem.querySelector('.cards__img')// картинка в карточке
const cardTitle = addNewCardItem.querySelector('.cards__title');//заголовок карточки
const likeButton = addNewCardItem.querySelector('.cards__like-button');//кнопка лайк
const deleteCardButton = addNewCardItem.querySelector('.card__delete-button');//кнопка удаления карточки*/


//переменные Popup открытия фото
const imgPopup = document.querySelector('.popup_open_image');//попап открытия фото
const popupImgCloseButton = document.querySelector('.popup__close-button_close_image');//кнопка закрытия попап
const popupPhoto = document.querySelector('.popup__img'); //картинка в попапе
const popupCaption = document.querySelector('.popup__caption');// подпись картинки в попапе
const newCardName = document.querySelector('.popup__input_value_place-name');
    const newCardLink = document.querySelector('.popup__input_value_img');


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



//функции для popup изменения профиля
//открытие popup и заполнение полей данными, указанными в профайле
function popupProfileOpen() {
    popupInputName.value = profileName.textContent; // присваиваем value полю формы, равное значению имени пользователя
    popupInputAbout.value = profileAbout.textContent;// присваиваем value полю формы, равное значению инфо о себе
    popupEditProfile.classList.add('popup_opened');
}


//Закрытие попапа
function popupProfileClose() { //функция простого закрытия
    popupEditProfile.classList.remove('popup_opened');//удаление класса открытия попапа
}

function formSubmitHandler(evt) { //функция сохранения измененных значений value
    evt.preventDefault();
    profileName.textContent = popupInputName.value;
    profileAbout.textContent = popupInputAbout.value;
    popupProfileClose();//закрыть форму
}





//функции для попап добавления карточек
//Открытие popup  добавления карточек
function popupAddCardOpen() {
    addCardPopup.classList.add('popup_opened');
}

//простое закрытие popup добавления карточек
function popupAddCardClose() {
    addCardPopup.classList.remove('popup_opened');
    
}





//функция добавления карточек, здесь же удаление и лайки
function createCard (CardName, imgLink) {
    const addCardTemplate = document.querySelector('#tamlate-card').content //заготовка карточки
    const addNewCardItem = addCardTemplate.querySelector('.cards__item').cloneNode(true);//клонируем заготовку 
    const cardImg = addNewCardItem.querySelector('.cards__img')// картинка в карточке
    const cardTitle = addNewCardItem.querySelector('.cards__title');//заголовок карточки
    const likeButton = addNewCardItem.querySelector('.cards__like-button');//кнопка лайк
    const deleteCardButton = addNewCardItem.querySelector('.card__delete-button');//кнопка удаления карточки

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
        imgPopup.classList.add('popup_opened');
    }) //открытие попапа картинки

    return addNewCardItem;

}




//сохранение данных на страницу
function formSubmitHandlerCards(evt) { 
    evt.preventDefault();
    
    cardsList.prepend(createCard (newCardName.value, newCardLink.value));
    evt.target.reset()
    popupAddCardClose();
}



//функции для попапа открытия картинки

    //закрытие попапа картинки
function popupImgClose () {
    imgPopup.classList.remove('popup_opened');
}




    //СОБЫТИЯ
profileChangeButton.addEventListener('click', popupProfileOpen); //открытие попапа редактирования профиля
popupForm.addEventListener('submit', formSubmitHandler); //сохранить данные редактирования профиля
profileCloseButton.addEventListener('click', popupProfileClose)// просто закрыть форму редактирования профиля


addCardButton.addEventListener('click', popupAddCardOpen);//открытие попапа добвления картинки
addCardButtonClose.addEventListener('click', popupAddCardClose);//простое закрытие попапа добавления карточек
addCardForm.addEventListener('submit', formSubmitHandlerCards)//сохранение и закрытие

popupImgCloseButton.addEventListener('click', popupImgClose);//закрытие попапа картинки
 