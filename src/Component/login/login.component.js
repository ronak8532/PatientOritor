import React, { Component } from "react";
import {Auth} from 'aws-amplify';
import { Redirect } from "react-router-dom";
import toaster from "toasted-notes"; 
import 'toasted-notes/src/styles.css';

export default class Login extends Component {
    state = {
        email: "",
        password: "",
        errors: {
          cognito: null,
          blankfield: false
        }
      };

      clearErrorState = () => {
        this.setState({
          errors: {
            cognito: null,
            blankfield: false
          }
        });
      };

      handleSubmit = async event => {
        event.preventDefault();
    
        // Form validation
        this.clearErrorState();
        // const error = Validate(event, this.state);
        // if (error) {
        //   this.setState({
        //     errors: { ...this.state.errors, ...error }
        //   });
        // }
    
        // AWS Cognito integration here
        const {email, password} = this.state;
        try{
           const user = await Auth.signIn(this.state.email, this.state.password)
           this.props.auth.setAuthStatus(true);
           this.props.auth.setUser(user);
            this.props.history.push('/dashboard');
        }catch(error){
            let err = null;
            !error.message ? err = { "message": error } : err = error;
            toaster.notify(err.message, {
                position: 'top-right', // top-left, top, top-right, bottom-left, bottom, bottom-right
                duration: 2000 // This notification will not automatically close
              })
        }
      };

      onInputChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
        document.getElementById(event.target.id).classList.remove("is-danger");
      };

    render() {
        return (
                       <div className="myform form">
                        <form onSubmit={this.handleSubmit}>
                           <div className="form-group">
                               <label>Email address</label>
                               <input type="email" className="form-control"
                                placeholder="Enter email"
                                id="email"
                                value={this.state.email}
                                onChange= {this.onInputChange} />
                           </div>
           
                           <div className="form-group">
                               <label>Password</label>
                               <input type="password" className="form-control" 
                               placeholder="Enter password"
                               id="password"
                               value={this.state.username}
                               onChange = {this.onInputChange} />
                           </div>
           
                           <div className="form-group">
                               <div className="custom-control custom-checkbox">
                                   <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                   <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                               </div>
                           </div>
           
                           <button type="submit" className="btn btn-default btn-block log-in">Submit</button>
                           <p className="forgot-password text-right">
                               Forgot <a href="/forgot-password">password?</a>
                           </p>
                          </form>
                        </div>
        );
    }
}