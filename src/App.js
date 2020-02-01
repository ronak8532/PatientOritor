import React, {Component} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Login from "./Component/login/login.component"
import SignUp from "./Component/register/register.component";
import Dashboard from "./Component/Dashboard/dashboard.component";
import ForgotPassword from "./Component/forgotPassword/forgotpassword.component";
import ForgotPasswordVerification from "./Component/forgotPassword/ForgotPasswordVerification.component";
import { Navbar } from 'reactstrap';
import { Auth } from 'aws-amplify';

export class App extends Component{
    
    state = {
        isAuthenticated: false,
        isAuthenticating: true,
        user: null
    }

    setAuthStatus = isAuthenticated => {
        this.setState({isAuthenticated: isAuthenticated});
    }

    setUser = user => {
        this.setState({ user: user });
    }

    async componentDidMount() {
        try{
            const session = await Auth.currentSession();
            this.setAuthStatus(true);
            const user = await Auth.currentAuthenticatedUser();
            this.setUser(user);
        }catch(err){
            console.log(err);
        }
        this.setState({ isAuthenticating: false});
    }

    render(){
     const authProps = {
         isAuthenticated: this.state.isAuthenticated,
         user: this.state.user,
         setAuthStatus: this.setAuthStatus,
         setUser: this.setUser
     }

        return (
            !this.state.isAuthenticating &&
    <div className="App">
      <div className="auth-wrapper">
        <div className="auth-inner">
            <Route>
                <div>
                <Navbar auth={authProps}>
                  <Switch>
                    <Route exact path='/' render={(props) => <Login {...props} auth={authProps} />} />
                    <Route path="/sign-in" render={(props) => <Login {...props} auth={authProps} />} />
                    <Route path="/forgot-password" render={(props) => <ForgotPassword {...props} auth={authProps} />}/>
                    <Route path="/forgot-password-verification" render={(props) => <ForgotPasswordVerification {...props} auth={authProps} />}/>
                    <Route path="/sign-up" render={(props) => <SignUp {...props} auth={authProps} />} />
                    <Route path="/dashboard" render={(props) => <Dashboard {...props} auth={authProps} />}/>
                  </Switch>
                </Navbar>
                </div>
            </Route>
        
          
        </div>
      </div>
    </div>
  );
    }
}
