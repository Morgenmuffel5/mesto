



export class UserInfo {

    constructor(nameSelector, infoSelector, userAvatarSelector) {
        this._name = document.querySelector(nameSelector);
        this._userInfo = document.querySelector(infoSelector);
        this._userAvatar = document.querySelector(userAvatarSelector);

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

    changeAvatar({avatar}) {
        this._userAvatar.src = avatar;
    }
}