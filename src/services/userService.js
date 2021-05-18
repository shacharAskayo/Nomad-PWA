import { httpService } from "./httpService"
import { storageService } from './asyncStorageService'



const baseUrl = '/auth'
const entityType = 'user'

export const userService = {
    signup,
    login,
    logout,
    getUsers,
    getUser,
    updateUser,
    onFollow
}


async function login(userCred) {
    try {
        const user = await storageService.get(entityType, userCred)
        return user
    } catch (err) {
        console.log(err)
    }
}

async function signup(userToAdd) {
    try {
        const newUser = {
            ...userToAdd,
            _id: (Math.random() * 102353653).toString(),
            currentLocation: {},
            myLocations: [],
            following: [],
            followers: [],
            posts: [],
            moments: [],
        }
        const copyUser = JSON.parse(JSON.stringify(newUser))
        const user = await storageService.post(entityType, copyUser)
        return newUser
    } catch (err) {
        console.log(err)
    }
}

async function logout() {
    try {
        // await httpService.post(baseUrl + '/logout')
        localStorage.removeItem('loggedUser')
        // localStorage.removeItem('user')
        // sessionStorage.removeItem('loggedUser')
    } catch (err) {
        console.log(err)
    }

}

async function getUsers(filterBy = null) {
    try {
        const users = await storageService.query('user', filterBy)
        return users
    } catch (err) {
        console.log(err)
    }
}

async function getUser(userId) {
    try {
        const user = await storageService.getById(entityType, userId)
        return JSON.parse(JSON.stringify(user))
    } catch (err) {
        console.log(err)
    }
}
async function updateUser(updateUser) {
    try {
        const user = await storageService.put(entityType, updateUser)
        return user
    } catch (err) {
        console.log(err)
    }
}

async function onFollow(updatedUser, updatedSearchedUser) {
    try {
        const user = await storageService.put(entityType, updatedUser)
        await storageService.put(entityType, updatedSearchedUser)
        return user
    } catch (err) {
        console.log(err)
    }
}
