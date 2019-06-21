import { combineReducers } from 'redux'
import auth from './auth_reducers'
import userData from './user_reducers'
import channel from './channel_reducers'


const rootReducer = combineReducers({
    auth,
    userData,
    channel
})

export default rootReducer