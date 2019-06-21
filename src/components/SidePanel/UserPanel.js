import React, { Component } from 'react'
import { Grid, Header, Icon, Dropdown, Image } from 'semantic-ui-react'
import firebase from './../../firebase'

const firebaseAuth = firebase.auth()

class UserPanel extends Component {

    state = {
        user: this.props.currentUser
    }

    dropdownOptions = [
        {
            key: 'user',
            text: <span> Signed in as <strong>{this.state.user.displayName}</strong></span>,
            disabled: true
        },
        {
            key: 'avatar',
            text: <span> Change Avatar</span>
        },
        {
            key: 'signout',
            text: <span onClick={this.signOut}>Sign Out</span>
        }
    ]


    signOut() {
        firebaseAuth.signOut()
    }


    render() {

        const { user } = this.state
        return(
            <Grid className="userPanel">
                <Grid.Column>
                    <Grid.Row className="userPanelRow">
                        {/* App Header */}
                        <Header inverted floated="left" as="h2">
                            <Icon name="code" />
                            <Header.Content>NewChat</Header.Content>
                        </Header>

                        {/* user dropdown */}
                        <Header inverted as="h4" className="dropdownHeader">
                            <Dropdown trigger={
                                <span>
                                    <Image src={user.photoURL} spaced="right" avatar />
                                    {user.displayName}
                                </span>
                            } options={this.dropdownOptions} />
                        </Header>

                    </Grid.Row>

                    
                </Grid.Column>
            </Grid>
        )
    }

}


export default UserPanel