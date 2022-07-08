
//открытие
let profileChangeButton = document.querySelector('.profile_change-button');


function popupOpen() {
    let popup = document.querySelector('.popup');
   return popup.classList.add('popup_opened');
}

profileChangeButton.addEventListener('click', popupOpen);

//закрытие

let profileCloseButton = document.querySelector('.popup__close-button');

function popupClose() {
    let popup = document.querySelector('.popup');
    return popup.classList.remove('popup_opened');
}

profileCloseButton.addEventListener('click', popupClose);
