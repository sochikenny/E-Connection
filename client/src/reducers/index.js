import { combineReducers } from 'redux'
import alert from './alert'
import auth from './auth'

export default combineReducers({
    //an object that has any reducer we create
    alert,
    auth
})