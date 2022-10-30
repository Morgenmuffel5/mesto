export class Api {

    constructor(baseUrl, headers) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(new Error(res.status))
    }

    //получение начального массива карточек
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {

            headers: this._headers,
        })
            .then(this._checkResponse)

    }

    //получение инфо о пользователе
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
            .then(this._checkResponse)

    }

    //сохранение данных изменения профиля
    saveNewUserInfo({ name, about }) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })

        })
            .then(this._checkResponse)
    }

    //добавление новой карточки
    addNewCard({ place, link }) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: place,
                link: link
            })
        }).then(this._checkResponse)
    }

    //добавить лайк
    addLike(card) {
        return fetch(`${this._baseUrl}/cards/${card._id}/likes`, {
            method: 'PUT',
            headers: this._headers,
        }).then(this._checkResponse)
    }

    removeLike(card) {
        return fetch(`${this._baseUrl}/cards/${card._id}/likes`, {
            method: 'DELETE',
            headers: this._headers,
        }).then(this._checkResponse)
    }

    deleteCard(card) {
        return fetch(`${this._baseUrl}/cards/${card._id}`, {
            method: 'DELETE',
            headers: this._headers,
        }).then(this._checkResponse)
    }

    changeAvatar({ avatar }) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatar
            })
        }).then(this._checkResponse)
    }







}








