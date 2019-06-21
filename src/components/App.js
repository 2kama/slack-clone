import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'


import Home from './Home'
import Login from './auth/Login'
import Register from './auth/Register'
import "./main.css"

import "semantic-ui-css/semantic.min.css"


const App = () => {

        return(
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                    </Switch>
                </div>
            </BrowserRouter>
        )


}

export default App