import React, { Component, Fragment } from 'react'
import { Menu, Icon, Modal, Form, Input, Button } from 'semantic-ui-react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addChannel, setCurrentChannel } from './../../actions/'

import firebase from './../../firebase'

const db = firebase.firestore()

class Channels extends Component {

    state = {
        user : this.props.currentUser,
        channels : [],
        modal: false,
        channelName: '',
        channelDetails: '',
        firstLoad : true,
        activeChannel : ''
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.channel) {
            this.setState({
                channels: nextProps.channel
            });
        }

        if(nextProps.addChannelReport) {
            if(nextProps.addChannelReport.message === "Success") {
                
            }
        }
    }

    componentWillUnmount() {
        this.listenForChannels()
    }


    componentDidMount() {
       
        this.listenForChannels = db.collection('channel').orderBy("createdOn").where("show", "==", true).onSnapshot((snap) => {
            
            const channels = []

            snap.forEach((docSnapshot) => {
              channels.push(docSnapshot.data());
            });
            this.setState({ channels }, () => this.setFirstChannel())

        })

    }

    setFirstChannel = () => {
        const firstChannel = this.state.channels[0]

        if (this.state.firstLoad && this.state.channels.length > 0) {
            this.props.setCurrentChannel(firstChannel)
        }

        this.setState({ firstLoad: false, activeChannel: firstChannel.channelID })
    }


    closeModal = () => this.setState({ modal: false })

    openModal = () => this.setState({ modal: true })

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = event => {
        event.preventDefault();
        if(this.isFormValid(this.state)) {
            this.props.addChannel(this.state.channelName, this.state.channelDetails, this.state.user.uid)
            this.closeModal()
            this.setState({ channelName: '', channelDetails: '' })
        }
    }

    isFormValid = ({ channelName, channelDetails }) => channelName && channelDetails


    changeChannel = channel => {
        this.props.setCurrentChannel(channel)
        this.setState({ activeChannel : channel.channelID })
    }


    render() {

        const { channels, modal, activeChannel } = this.state

        

        return(
            <Fragment>
            <Menu.Menu className="channelMenu">
                <Menu.Item>
                    <span>
                        <Icon name="exchange" /> CHANNELS
                    </span>{" "}
                    ({channels.length }) <Icon name="add" onClick={this.openModal} />
                </Menu.Item>

                
                {
                    channels.map(channel => {
                        return (
                            <Menu.Item active={channel.channelID === activeChannel} className="channelList" key={channel.channelID} onClick={() => this.changeChannel(channel)} name={channel.channelID}>
                                # {channel.channelName}
                            </Menu.Item>
                        )
                        
                    })
                }

            </Menu.Menu>

            
            <Modal basic open={modal} onClose={this.closeModal}>
                <Modal.Header>Add a Channel</Modal.Header>
                <Modal.Content>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Field>
                            <Input fluid label="Name of Channel" name="channelName" onChange={this.handleChange} />
                        </Form.Field>

                        <Form.Field>
                            <Input fluid label="About the Channel" name="channelDetails" onChange={this.handleChange} />
                        </Form.Field>
                    </Form>
                </Modal.Content>

                <Modal.Actions>
                    <Button color="green" inverted onClick={this.handleSubmit}>
                        <Icon name="checkmark" /> Add
                    </Button>
                    <Button color="red" inverted onClick={this.closeModal}>
                        <Icon name="remove" /> Cancel
                    </Button>
                </Modal.Actions>
            </Modal>

            </Fragment>
        )
    }
}


let mapStateToProps = state => {
    console.log(state.channel.currentChannel)
    return {
        
        addChannelReport : state.channel.addChannelReport,
        currentChannel: state.channel.currentChannel
        
    }
}

let mapDispatchToProps = dispatch => {
    return bindActionCreators({
        addChannel, setCurrentChannel
    }, dispatch)
}



export default connect(mapStateToProps, mapDispatchToProps)(Channels)