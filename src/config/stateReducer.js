export default function (state, action) {
    switch(action.type) {
        case "setLoggedInUser": {
            return {
                ...state,
                loggedInUser: action.data
            }
        }
        case "setEventPosts": {
            return {
                ...state,
                eventPosts: action.data
            }
        }
        default: 
            return state
    }
}