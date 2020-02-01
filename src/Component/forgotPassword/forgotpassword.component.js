import React, { Component } from "react";
import {Auth} from 'aws-amplify';
import { Redirect } from "react-router-dom";
import toaster from "toasted-notes"; 
import 'toasted-notes/src/styles.css';

export default class ForgotPassword extends Component {
    state = {
        email: "",
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

      forgotPasswordHandler = async event => {
        event.preventDefault();
    
        // Form validation
        this.clearErrorState();
    
        // AWS Cognito integration here
        const {email} = this.state;
        try{
           await Auth.forgotPassword(this.state.email);
            this.props.history.push('/forgot-password-verification');
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
                           <h4>Forgot your Password?</h4>
                           <h6>Please enter your email address associated with your account and we'll email you a password reset link</h6>
                        <form onSubmit={this.forgotPasswordHandler}>
                           <div className="form-group">
                               <label>Email address</label>
                               <input type="email" className="form-control"
                                placeholder="Enter email"
                                id="email"
                                value={this.state.email}
                                onChange= {this.onInputChange} />
                           </div>
           
                           <button type="submit" className="btn btn-default btn-block log-in">Submit</button>
                           
                          </form>
                        </div>
        );
    }
}