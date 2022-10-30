import { Popup } from "./Popup.js";

export class PopupDeleter extends Popup {

    constructor(popupSelector, {handleDeleteCard}) {
        super(popupSelector);
        this._deleteButton = this._popup.querySelector('.popup__button');
        this._handleDeleteCard = handleDeleteCard;
    }

    openPopup (card) {
        this._card = card;
        super.openPopup();
    }

setEventListeners() {
    super.setEventListeners()
    this._deleteButton.addEventListener('click', (evt) => {
        evt.preventDefault()
        this._handleDeleteCard(this._card)
    
    })
}
}