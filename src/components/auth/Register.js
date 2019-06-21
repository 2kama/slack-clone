import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { registerUser } from './../../actions/'
import firebase from './../../firebase'


import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react'


const firebaseAuth = firebase.auth()

class Register extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username : '',
            email : '',
            password : '',
            passwordRepeat : '',
            error : false,
            errorMsg : '',
            loading : false,
            user : false
        }
    }


    componentDidMount() {
        firebaseAuth.onAuthStateChanged(user => {
            if (user) {
                this.setState({ user : true })
                window.location.href = '/'
            } else {
              
            }
        });
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.auth) {
            this.setState({
                error: true,
                errorMsg: nextProps.auth.regReport.message,
                loading: false
            });
        }
    }


    handleChange = event => {
        this.setState({ [event.target.name] : event.target.value })
    }

    isFormValid = () => {
        
        if(this.isFromEmpty(this.state)) {

            this.setState({ error : true, errorMsg : 'Fill in all fields', loading : false })
            return false

        }else if(!this.isEmailValid(this.state)) {
            
            this.setState({ error: true, errorMsg: 'Please input a valid Email Address', laoding : false })
            return false

        }else if(!this.isPasswordValid(this.state)) {
            
            this.setState({ loading : false })
            return false

        }else {
            return true
        }

    }


    isFromEmpty = ({ username, email, password, passwordRepeat }) => {
        return !username.length || !email.length || !password.length || !passwordRepeat.length
    }

    isEmailValid = ({ email }) => {
        let regex = /\S+@\S+\.\S+/

        return regex.test(email)
    }

    isPasswordValid = ({ password, passwordRepeat }) => {
        if(password.length < 8 || passwordRepeat.length < 8) {
            this.setState({ error: true, errorMsg: 'Your password must be atleast 8 characters long' })
            return false
        }else if(password !== passwordRepeat) {
            this.setState({ error: true, errorMsg: `Your passwords do not match` })
            return false
        }else {
            return true
        }
    }


    formSubmit = event => {
        event.preventDefault()
        this.setState({ error: false, loading: true })

        if(this.isFormValid()) {
            this.props.registerUser(this.state.username, this.state.email, this.state.password)
        }   

    }

    handleError = ( errorMsg, inputName) => {
        if(errorMsg !== undefined) {
            return errorMsg.toLowerCase().includes(inputName) ? "error" : ""
        }
    }


    render() {

        const { username, email, password, passwordRepeat, error, errorMsg, loading, user } = this.state

        return(
            <>

                <Grid textAlign="center" verticalAlign="middle" className="app">
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as="h2" icon color="blue" textAlign="center">
                            <Icon name="puzzle piece" color="blue" />
                            Register for NewChat
                        </Header>

                        <Form size="large" onSubmit={this.formSubmit}>
                            <Segment stacked>
                                <Form.Input fluid name="username" icon="user" value={username} iconPosition="left" placeholder="Username" onChange={this.handleChange} type="text" />
                                <Form.Input fluid name="email" icon="mail" className={this.handleError(errorMsg, "email")} value={email} iconPosition="left" placeholder="Email Address" onChange={this.handleChange} type="email" />
                                <Form.Input fluid name="password" icon="lock" className={this.handleError(errorMsg, "password")} value={password} iconPosition="left" placeholder="Password" onChange={this.handleChange} type="password" />
                                <Form.Input fluid name="passwordRepeat" icon="repeat" className={this.handleError(errorMsg, "password")} value={passwordRepeat} iconPosition="left" placeholder="Repeat Password" onChange={this.handleChange} type="password" />
                                <Button disabled={loading} className={loading ? 'loading' : '' } color="blue" fluid size="large">Register</Button>
                            </Segment>
                        </Form>

                        {error && !user && (
                            <Message error>
                                <h5>Error</h5>
                                {errorMsg}
                            </Message>
                        )}

                        <Message>Already a user? <a href="/login">Login</a></Message>
                    </Grid.Column>
                </Grid>

            </>
        )
    }
}




let mapStateToProps = state => {
    
    return {
        auth : state.auth
        
    }
}

let mapDispatchToProps = dispatch => {
    return bindActionCreators({
        registerUser
    }, dispatch)
}



export default connect(mapStateToProps, mapDispatchToProps)(Register)