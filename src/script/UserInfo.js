const popupInputName = document.querySelector('.popup__input_value_name');//поле ввода имени в форме
const popupInputAbout = document.querySelector('.popup__input_value_about'); //поле ввода инфо о себе в форме



export class UserInfo {

    constructor(nameSelector, infoSelector) {
        this._name = document.querySelector(nameSelector);
        this._userInfo = document.querySelector(infoSelector);

    }

    getUserInfo() {
        popupInputName.value = this._name.textContent;
        popupInputAbout.value = this._userInfo.textContent;
    }

    setUserInfo({Name, About}) {
        this._name.textContent = Name;
        this._userInfo.textContent = About;
    }
}