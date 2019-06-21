import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { loginUser } from './../../actions/'
import firebase from './../../firebase'


import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react'


const firebaseAuth = firebase.auth()

class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email : '',
            password : '',
            error : false,
            errorMsg : '',
            loading : false,
            user : false
        }
    }


    componentDidMount() {
        firebaseAuth.onAuthStateChanged(user => {
            if (user) {
                window.location.href = '/'
                this.setState({ user : true })
            } else {
              
            }
        });
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.auth) {
            this.setState({
                error: true,
                errorMsg: nextProps.auth.logReport.message,
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

        }else {
            return true
        }

    }


    isFromEmpty = ({ email, password }) => {
        return !email.length || !password.length
    }

    isEmailValid = ({ email }) => {
        let regex = /\S+@\S+\.\S+/

        return regex.test(email)
    }


    formSubmit = event => {
        event.preventDefault()
        this.setState({ error: false, loading: true })

        if(this.isFormValid()) {
            this.props.loginUser(this.state.email, this.state.password)
        }   

    }

    handleError = ( errorMsg, inputName) => {
        if(errorMsg !== undefined) {
            return errorMsg.toLowerCase().includes(inputName) ? "error" : ""
        }
    }


    render() {

        const { email, password, error, errorMsg, loading, user } = this.state

        return(
            <>
                <Grid textAlign="center" verticalAlign="middle" className="app">
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as="h2" icon color="green" textAlign="center">
                            <Icon name="code branch" color="green" />
                            Login to NewChat
                        </Header>

                        <Form size="large" onSubmit={this.formSubmit}>
                            <Segment stacked>
                                <Form.Input fluid name="email" icon="mail" className={this.handleError(errorMsg, "email")} value={email} iconPosition="left" placeholder="Email Address" onChange={this.handleChange} type="email" />
                                <Form.Input fluid name="password" icon="lock" className={this.handleError(errorMsg, "password")} value={password} iconPosition="left" placeholder="Password" onChange={this.handleChange} type="password" />
                                <Button disabled={loading} className={loading ? 'loading' : '' } color="green" fluid size="large">Login</Button>
                            </Segment>
                        </Form>

                        {error && !user && (
                            <Message error>
                                <h5>Error</h5>
                                {errorMsg}
                            </Message>
                        )}

                        <Message>Don't have an account? <a href="/register">Register</a></Message>
                    </Grid.Column>
                </Grid>

            </>
        )
    }
}




let mapStateToProps = (state) => {
    
    return {
        auth : state.auth
        
    }
}

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        loginUser
    }, dispatch)
}



export default connect(mapStateToProps, mapDispatchToProps)(Login)