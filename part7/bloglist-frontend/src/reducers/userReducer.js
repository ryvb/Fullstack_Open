import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser(state, action) {
            return action.payload
        },
        logoutUser(state, action) {
            const newState = null
            return newState
        }
    }
})

export const { setUser, logoutUser } = userSlice.actions

export const login = (userObject) => {
    return async dispatch => {
        try {
            const user = await loginService.login(userObject)
            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            dispatch(setUser(user))
        } catch (exception) {
            console.log(exception)
        }
    }
}

export const logout = () => {
    return async dispatch => {
        dispatch(logoutUser())
    }
}

export const extendLogin = (userObject) => {
    return async dispatch => {
        blogService.setToken(userObject.token)
        dispatch(setUser(userObject))
    }
}

export default userSlice.reducer

/*
*/