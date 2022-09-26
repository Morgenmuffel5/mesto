
const popupPhoto = document.querySelector('.popup__img'); //картинка в попапе
const imgPopup = document.querySelector('.popup_open_image');//попап открытия фото
const popupCaption = document.querySelector('.popup__caption');// подпись картинки в попапе


export class Card {

    _templateSelector;
    _cardName;
    _imageLink;
    _newCard;
    _likeButton;
    _deleteCardButton;
    _cardImg;
  
    constructor(templateSelector, cardName, imageLink) {
        this._templateSelector = templateSelector;
        this._cardName = cardName;
        this._imageLink = imageLink;
        this._newCard = document.querySelector(this._templateSelector).content.querySelector('.cards__item').cloneNode(true);
        this._likeButton = this._newCard.querySelector('.cards__like-button');
        this._deleteCardButton = this._newCard.querySelector('.card__delete-button');
        this._cardImg = this._newCard.querySelector('.cards__img');


    }

   


    //метод возвращает полностью готовую карточку
    getCard() {
        this._setEventListeres();
        this._newCard.querySelector('.cards__img').src = this._imageLink;
        this._newCard.querySelector('.cards__img').alt = this._cardName;
        this._newCard.querySelector('.cards__title').textContent = this._cardName;

        return this._newCard;
    }


    //метод переключающий классы активности у кнопок like
    _toggleClassLikeButton() {
        this._likeButton.classList.toggle('cards__like-button_active');
    }


    //метод удаления карточки
    _deleteCard() {
        this._newCard.remove();
    }

    //метод удаления класса открытия для попапа
    _closeImagePopup() {
        imgPopup.classList.remove('popup_opened');
    }

    //метод закрытия попапа по esc
     _closePopupByEsc(evt) {
        if (evt.key === 'Escape') {
            this._closeImagePopup();
        }
    }

    //метод закрытия попапа картинки по оверлей и кнопке закрытия
    _closePopup(evt) {
        if (evt.target == evt.currentTarget || evt.target.classList.contains('popup__close-button')) {
            popupPhoto.src = "";
            this._closeImagePopup();
            document.removeEventListener('keydown', () => {
                this._closePopupByEsc(evt);
            });
        }
    }


    //метод открытия попапа картинки 
    _openImagePopup() {
        popupPhoto.src = this._imageLink;
        popupPhoto.alt = this._cardName;
        popupCaption.textContent = this._cardName;

        imgPopup.classList.add('popup_opened');
        document.addEventListener('keydown', (evt) => {
            this._closePopupByEsc(evt); 
        })
    }

    //метод добавления слушателей 
    _setEventListeres() {
        this._likeButton.addEventListener('click', () => {
            this._toggleClassLikeButton();
        });

         this._deleteCardButton.addEventListener('click', () => {
            this._deleteCard();
        })

        this._cardImg.addEventListener('click', () => {
            this._openImagePopup();
        })


        imgPopup.addEventListener('click', (evt) => {
            this._closePopup(evt)
        })
    } 
}