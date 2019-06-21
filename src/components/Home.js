import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setUser, clearUser } from './../actions/'
import firebase from './../firebase'

import Spinner from './Spinner'
import { Grid } from 'semantic-ui-react'

import ColorPanel from './ColorPanel/ColorPanel'
import SidePanel from './SidePanel/SidePanel'
import Messages from './Messages/Messages'
import MetaPanel from './MetaPanel/MetaPanel'

const firebaseAuth = firebase.auth()
const db = firebase.firestore()


class Home extends Component {


    createUserData (user) {
        db.collection('users').doc(user.uid).get()
            .then(docSnapshot => {
                if (docSnapshot.exists) {
                        
                }else {
                    db.collection('users').doc(user.uid).set({
                        username : user.displayName,
                        email : user.email,
                        uid : user.uid,
                        photoURL : user.photoURL
                    })
                }
            });
    }


    componentDidMount() {

        firebaseAuth.onAuthStateChanged(user => {
            if (user) {
                this.props.setUser(user)
                this.createUserData(user)

            } else {
                this.props.clearUser();
                window.location.href = '/login'
            }
        });
    }

    render() {

        return this.props.isLoading ? <Spinner /> : (
            
            <Grid columns="equal" className="mainGrid">
                <ColorPanel />
                <SidePanel currentUser={this.props.user} />

                <Grid.Column className="messageGrid">
                    <Messages />
                </Grid.Column>
                
                <Grid.Column width={4}>
                    <MetaPanel />
                </Grid.Column>
                
            </Grid>
            
        )

    }

}


let mapStateToProps = state => {
    
    return {
        user : state.userData.currentUser,
        isLoading : state.userData.isLoading
        
    }
}

let mapDispatchToProps = dispatch => {
    return bindActionCreators({
        setUser, clearUser
    }, dispatch)
}



export default connect(mapStateToProps, mapDispatchToProps)(Home)