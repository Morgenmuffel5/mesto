export class Api {

    //получение начального массива карточек
    getInitialCards() {
       return fetch('https://mesto.nomoreparties.co/v1/cohort-52/cards', {
        headers: {
            authorization: '32d71a68-3927-4155-9844-e97b16e8b4b1',
                'Content-Type': 'application/json'
        }
       })
        .then (res => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(new Error(res.status))
        }) .catch(err => {
            Promise.reject(err)
        })
        
    }     

    //получение инфо о пользователе
    getUserInfo() {
        return fetch('https://nomoreparties.co/v1/cohort-52/users/me', {
            headers: {
                authorization: '32d71a68-3927-4155-9844-e97b16e8b4b1',
                    'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(new Error(res.status))
        }).catch(err => {
            Promise.reject(err)
        })
 
    }

    //сохранение данных изменения профиля
    saveNewUserInfo ({name, about}) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-52/users/me', {
            method: 'PATCH',
            headers: {
                authorization: '32d71a68-3927-4155-9844-e97b16e8b4b1',
                    'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                about: about
            })

        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(new Error(res.status))
        }).catch(err => {
            Promise.reject(err)
        })
    }

    //добавление новой карточки
    addNewCard ({place, link}) {
return fetch('https://mesto.nomoreparties.co/v1/cohort-52/cards', {
    method: 'POST',
    headers: {
        authorization: '32d71a68-3927-4155-9844-e97b16e8b4b1',
            'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: place,
        link: link
    })
}).then(res => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(new Error(res.status))
}).catch(err => {
    Promise.reject(err)
})
    }

//добавить лайк
addLike (card) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-52/cards/${card._id}/likes`, {
    method: 'PUT',
    headers: {
        authorization: '32d71a68-3927-4155-9844-e97b16e8b4b1',
    } 
}).then(res => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(new Error(res.status))
}).catch(err => {
    Promise.reject(err)
})
}

removeLike (card) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-52/cards/${card._id}/likes`, {
        method: 'DELETE',
        headers: {
            authorization: '32d71a68-3927-4155-9844-e97b16e8b4b1',
        }
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(new Error(res.status))
    }).catch(err => {
        Promise.reject(err)
    })
}

deleteCard(card) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-52/cards/${card._id}`, {
        method: 'DELETE',
        headers: {
            authorization: '32d71a68-3927-4155-9844-e97b16e8b4b1',
        }
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(new Error(res.status))
    }).catch(err => {
        Promise.reject(err)
    })
}

    changeAvatar({avatar}) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-52/users/me/avatar', {
            method: 'PATCH',
            headers: {
                authorization: '32d71a68-3927-4155-9844-e97b16e8b4b1',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: avatar
            })
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(new Error(res.status))
        }).catch(err => {
            Promise.reject(err)
        })
    }







}








