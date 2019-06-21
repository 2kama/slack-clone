import { ADD_CHANNEL, SET_CURRENT_CHANNEL } from './../actions/types'



export default function (state = {}, action) {

    switch(action.type) {
        case ADD_CHANNEL:
            return {
                ...state,
                addChannelReport : action.payload 
            }

        case SET_CURRENT_CHANNEL: 
            return {
                ...state,
                currentChannel : action.payload
            }

        default:
            return state
    }

}