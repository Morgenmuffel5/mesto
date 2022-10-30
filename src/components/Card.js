


export class Card {

    _templateSelector;
    _cardName;
    _imageLink;
    _newCard;
    _likeButton;
    _deleteCardButton;
    _cardImg;

    constructor(templateSelector, cardName, imageLink, {handleCardClick, handleAddLike, handleRemoveLike, handleOpenDelete}, cardResponse, likeTextCont, currentUserId) {
        this._templateSelector = templateSelector;
        this._cardName = cardName;
        this._imageLink = imageLink;
        this._newCard = document.querySelector(this._templateSelector).content.querySelector('.cards__item').cloneNode(true);
        this._likeButton = this._newCard.querySelector('.cards__like-button');
        this._deleteCardButton = this._newCard.querySelector('.card__delete-button');
        this._cardImg = this._newCard.querySelector('.cards__img');
        this._handleCardClick = handleCardClick;
        this._cardResponse = cardResponse;
        this._likeQuontity = this._cardResponse.likes
        this._likeTextCont = this._newCard.querySelector(likeTextCont);
        this._handleAddLike = handleAddLike;
        this._handleRemoveLike = handleRemoveLike;
        this._handleOpenDelete = handleOpenDelete;
        this._currentUserId = currentUserId;

    }




    //метод возвращает полностью готовую карточку
    getCard() {
        this._setEventListeres();
        this._cardImg.src = this._imageLink;
        this._cardImg.alt = this._cardName;
        this._newCard.querySelector('.cards__title').textContent = this._cardName;
        this._likeTextCont.textContent = this._likeQuontity.length
        this._checkDeleteButton();


        this._checkLike(this._likeQuontity)
        return this._newCard;
    }

    _checkDeleteButton() {
       if (this._cardResponse.owner._id !== this._currentUserId) {
        this._deleteCardButton.classList.add('card__delete-button_disable')
       }
    }

    //метод переключающий классы активности у кнопок like
    _toggleClassLikeButton() {
        const isLike = this._likeQuontity.findIndex(like => like._id === this._currentUserId);

    if (isLike > -1) {
        this._handleRemoveLike(this);
        
    } else {
        this._handleAddLike(this);
      
    }
    }

    //установка иконки если я уже лайкала карточку
    _checkLike (likeQuontity) { 
        const isLike = likeQuontity.findIndex(like => like._id === this._currentUserId);
        if (isLike > -1) {
            this._likeButton.classList.add('cards__like-button_active');
    }
}

//принимает новую инфо о карточке
    setLikeInfo(newCardInfo) {
        this._likeQuontity = newCardInfo.likes;//сщхраняю новый массив лайков
        this._likeTextCont.textContent = this._likeQuontity.length; //обновляю текстконтент счетчика лайков
        const isLike = this._likeQuontity.findIndex(like => like._id === this._currentUserId);

        if (isLike > -1) {
            this._likeButton.classList.add('cards__like-button_active');
        } else {
            this._likeButton.classList.remove('cards__like-button_active');
        }
    }


    //метод удаления карточки
    _deleteCard() {
        this._handleOpenDelete(this._cardResponse);

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