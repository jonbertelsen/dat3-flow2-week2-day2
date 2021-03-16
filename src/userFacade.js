
const URL = 'http://localhost:3333/api/users'

function getAllUsers() {
    return fetch(URL)
        .then(res => handleHttpErrors(res))
}

function getUser(id) {
    return fetch(URL + '/' + id)
        .then(res => handleHttpErrors(res))
}

function addUser(user) {
    const options = makeOptions('POST', user)
    return fetch(URL, options)
        .then(res => handleHttpErrors(res))
}

function editUser(user, id) {
    const options = makeOptions('PUT', user)
    return fetch(URL + '/' + id, options)
        .then(res => handleHttpErrors(res))
}

function deleteUser(id) {
    const options = makeOptions('DELETE', { id })
    return fetch(URL + '/' + id, options)
        .then(res => handleHttpErrors(res))
}

const userFacade = {
    getAllUsers,
    getUser,
    addUser,
    editUser,
    deleteUser
}

function makeOptions(method, body) {
    var opts = {
        method: method,
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        }
    }
    if (body) {
        opts.body = JSON.stringify(body);
    }
    return opts;
}


/* Error handling */

function handleHttpErrors(res) {
    if (!res.ok) {
        return Promise.reject({ status: res.status, fullError: res.json() })
    }
    return res.json();
}

export default userFacade

