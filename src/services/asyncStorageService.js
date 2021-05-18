

const DB = require('../DB/user.json')
const gUsers = DB.users
const model = ['nickName', 'password', 'email', 'following', 'followers', 'profileImg', 'moments', 'firstName', 'lastName']

export const storageService = {
    query,
    get,
    post,
    put,
    remove,
    getById,
    updateUserLikes,
    updateUserComments,

}


function query(entityType, filterBy = null) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || []
    if (!entities || entities?.length === 0) {
        _save(entityType, gUsers)
        return Promise.resolve(gUsers)
    }
    else {
        if (filterBy) {
            const filteredEntities = entities.filter(entity => entity.firstName.toLowerCase().startsWith(filterBy.toLowerCase()))
            return Promise.resolve(filteredEntities)
        }
        return Promise.resolve(JSON.parse(JSON.stringify(entities)))
    }
}

async function updateUserLikes(entityType, currPost, userCred) {

    const toggleIdx = currPost.postLikes.findIndex(like => like._id === userCred._id)
    const author = await getById(entityType, currPost.createdBy._id)
    const postIdx = author.posts.findIndex(post => post.id === currPost.id)
    if (toggleIdx < 0) currPost.postLikes.unshift(userCred)
    else currPost.postLikes.splice(toggleIdx, 1)

    author.posts.splice(postIdx, 1, currPost)
    await put(entityType, author)
    return { currPost, author }
}

async function updateUserComments(entityType, updatedPost) {
    const author = await getById(entityType, updatedPost.createdBy._id)
    const postIdx = author.posts.findIndex(post => post.id === updatedPost.id)
    author.posts.splice(postIdx, 1, updatedPost)
    await put('user', author)
    return JSON.parse(JSON.stringify(author))
}

async function get(entityType, userCred) {
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'))
    if (loggedUser && _ModelCheck(loggedUser)) return loggedUser
    else {
        localStorage.removeItem('loggedUser')
        if (userCred && _findByCred(userCred)) return _findByCred(userCred)
        else return null
    }
}


async function getById(entityType, userId) {
    const users = await query(entityType)
    const user = users.find(user => user._id === userId)
    const copy = JSON.parse(JSON.stringify(user))
    return copy
}

async function post(entityType, newEntity) {
    const entities = await query(entityType)
    entities.push(newEntity)
    _save(entityType, entities)
    _save('loggedUser', newEntity)
    return newEntity
}



async function put(entityType, updatedEntity) {
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'))
    const entities = await query(entityType)
    const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
    entities.splice(idx, 1, updatedEntity)
    if (loggedUser._id === updatedEntity._id) _save('loggedUser', JSON.parse(JSON.stringify(updatedEntity)))
    _save(entityType, entities)
    return updatedEntity
}

function remove(entityType, entityId) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === entityId)
            entities.splice(idx, 1)
            _save(entityType, entities)
        })
}


function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}



function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}


function _ModelCheck(user) {
    return model.every(prop => user.hasOwnProperty(prop))
}

async function _findByCred(userCred) {
    const users = await query('user')
    const currUser = users.find(user => user.nickName === userCred.nickName && user.password === userCred.password)
    if (currUser) {
        _save('loggedUser', currUser)
        return JSON.parse(JSON.stringify(currUser))
    }
    else return null
}
