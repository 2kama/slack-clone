import firebase from './../firebase'
import { USER_LOGIN, USER_REGISTER, USER_DATA, CLEAR_USER_DATA, ADD_CHANNEL, SET_CURRENT_CHANNEL } from './types'
import md5 from 'md5'


const db = firebase.firestore()
const auth = firebase.auth()


export const registerUser = (username, email, password) => {

   

    return dispatch => {
        auth.createUserWithEmailAndPassword(email, password)
        .then(createdUser => {

            createdUser.user.updateProfile({
                displayName : username,
                photoURL : `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
            }).then(() => {

                dispatch({
                    type: USER_REGISTER,
                    payload : createdUser
                })

            })
             
            
        }).catch(err => {
            dispatch({
                type: USER_REGISTER,
                payload : err
            })
        })
    }

}




export const loginUser = (email, password) => {


      return dispatch => {
          auth.signInWithEmailAndPassword(email, password)
          .then(res => {
              dispatch({
                  type: USER_LOGIN,
                  payload : res
              })
          }).catch(err => {
              dispatch({
                  type: USER_LOGIN,
                  payload : err
              })
          })
      }

}



export const setUser = user => {
    return dispatch => {
        dispatch({
            type: USER_DATA,
            payload : user
        })
    }
}

export const clearUser = () => {
    return dispatch => {
        dispatch({
            type: CLEAR_USER_DATA
        })
    }
}


export const addChannel = (channelName, channelDetails, user) => {
    return dispatch => {
        let channelID = `channel_${Math.random().toString(36).substr(2, 12)}_${Math.random().toString(36).substr(2, 12)}`
        db.collection("channel").doc(channelID).set({
            channelID : channelID,
            channelName : channelName,
            channelDetails : channelDetails,
            createdBy : user,
            createdOn : new Date().getTime(),
            show : true
        }).then(() => {
            dispatch({
                type: ADD_CHANNEL,
                payload : {
                    message : 'Success'
                }
            })
        }).catch(err => {
            dispatch({
                type: ADD_CHANNEL,
                payload : err
            })
        })
    }
}


export const setCurrentChannel = channel => {
    return dispatch => {
        dispatch({
            type: SET_CURRENT_CHANNEL,
            payload: channel
        })
    }
}

