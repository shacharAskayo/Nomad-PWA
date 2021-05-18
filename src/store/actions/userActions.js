import { userService } from '../../services/userService.js'

export function login(userToLogin) {
    return async dispatch => {
        try {
            const user = await userService.login(userToLogin)
            dispatch({ type: 'LOGIN', user })
            return user
        } catch (err) {
            console.log(err)
        }
    }
}

export function signUp(userToSignup) {
    return async dispatch => {
        try {
            const user = await userService.signup(userToSignup)
            dispatch({ type: 'LOGIN', user })
        } catch (err) {
            console.log(err)
        }
    }
}

export function logout() {
    return async dispatch => {
        try {
            const user = await userService.logout()
            dispatch({ type: 'LOGOUT', user })
        } catch (err) {
            console.log(err)
        }
    }
}

export function loadUser(id) {
    return async dispatch => {
        try {
            const user = await userService.getUser(id)
            dispatch({ type: 'LOAD_USER', user })
        } catch (err) {
            console.log(err)
        }
    }
}

export function updateUser(newUser) {
    return async dispatch => {
        try {
            const user = await userService.updateUser(newUser)
            dispatch({ type: 'LOAD_USER', user })
        } catch (err) {
            console.log(err)
        }
    }
}

export function onUserFollow(newUser,newSearchedUser) {
    return async dispatch => {
        try {
            const user = await userService.onFollow(newUser,newSearchedUser)
            dispatch({ type: 'LOAD_USER', user })
        } catch (err) {
            console.log(err)
        }
    }
}
