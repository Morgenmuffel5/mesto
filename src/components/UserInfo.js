const popupInputName = document.querySelector('.popup__input_value_name');//поле ввода имени в форме
const popupInputAbout = document.querySelector('.popup__input_value_about'); //поле ввода инфо о себе в форме



export class UserInfo {

    constructor(nameSelector, infoSelector) {
        this._name = document.querySelector(nameSelector);
        this._userInfo = document.querySelector(infoSelector);

    }

    getUserInfo() {
        this._userInfoObj ={}
        this._userInfoObj.userName = this._name.textContent;
        this._userInfoObj.infoAbout = this._userInfo.textContent;

        return this._userInfoObj
    }

    setUserInfo({name, about}) {
        this._name.textContent = name;
        this._userInfo.textContent = about;
    }
}