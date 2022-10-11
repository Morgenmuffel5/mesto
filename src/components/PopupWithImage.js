import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {

    constructor(popupSelector) {
        super(popupSelector);
        this._popupPhoto = this._popup.querySelector('.popup__img');
        this._popupCaption = this._popup.querySelector('.popup__caption')
    }

    openPopup(cardName, imageLink) {
        this._popupPhoto.src = imageLink
        this._popupPhoto.alt = cardName;
        this._popupCaption.textContent = cardName;

       super.openPopup();
        
    }
    }
