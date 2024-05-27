import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
    switch (action.type) {
      case "SET":
        console.log(state)
        console.log(action)
        return action.payload
      case "REMOVE":
        // eslint-disable-next-line no-case-declarations
        const newState = "";
        return newState
      default:
        return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, '')

    return (
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}
export default NotificationContext