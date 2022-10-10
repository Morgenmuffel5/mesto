


export class Card {

    _templateSelector;
    _cardName;
    _imageLink;
    _newCard;
    _likeButton;
    _deleteCardButton;
    _cardImg;

    constructor(templateSelector, cardName, imageLink, {handleCardClick}) {
        this._templateSelector = templateSelector;
        this._cardName = cardName;
        this._imageLink = imageLink;
        this._newCard = document.querySelector(this._templateSelector).content.querySelector('.cards__item').cloneNode(true);
        this._likeButton = this._newCard.querySelector('.cards__like-button');
        this._deleteCardButton = this._newCard.querySelector('.card__delete-button');
        this._cardImg = this._newCard.querySelector('.cards__img');
        this._handleCardClick = handleCardClick;

    }




    //метод возвращает полностью готовую карточку
    getCard() {
        this._setEventListeres();
        this._cardImg.src = this._imageLink;
        this._cardImg.alt = this._cardName;
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
        this._newCard = null
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
            this._handleCardClick(this._cardName, this._imageLink);
        })

    }
}