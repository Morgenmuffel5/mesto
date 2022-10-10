import { Popup } from "./Popup.js";
const popupPhoto = document.querySelector('.popup__img'); //картинка в попапе
const popupCaption = document.querySelector('.popup__caption');// подпись картинки в попапе

export class PopupWithImage extends Popup {

    constructor(popupSelector) {
        super(popupSelector)
    }

    openPopup(cardName, imageLink) {
        popupPhoto.src = imageLink
        popupPhoto.alt = cardName;
        popupCaption.textContent = cardName;

       this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => {
        super._handleEscClose(evt);
        
    })
    }
}