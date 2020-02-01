import React, { Component } from 'react';
import {Auth} from 'aws-amplify';
import toaster from "toasted-notes";

class ForgotPasswordVerification extends Component {
  state = {
    verificationcode: "",
    email: "",
    newpassword: "",
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

  passwordVerificationHandler = async event => {
    event.preventDefault();

    // Form validation
    this.clearErrorState();
    

    // AWS Cognito integration here
      try{

        await Auth.forgotPasswordSubmit(
            this.state.email,
            this.state.verificationcode,
            this.state.newpassword
        ); 
        this.props.history.push('/sign-in');
        toaster.notify('Password change successfully', {
            position: 'top-right', // top-left, top, top-right, bottom-left, bottom, bottom-right
            duration: 2000 // This notification will not automatically close
          })
      }catch(err){
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
        <h4>Set new password</h4>
        <h6>Please enter the verification code sent to your email address below,
                your email address and a new password.</h6>
    <form onSubmit={this.passwordVerificationHandler}>
                <div className="field">
                  <p className="control">
                    <input
                      type="text"
                      className="input"
                      id="verificationcode"
                      aria-describedby="verificationCodeHelp"
                      placeholder="Enter verification code"
                      value={this.state.verificationcode}
                      onChange={this.onInputChange}
                    />
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <input 
                      className="input" 
                      type="email"
                      id="email"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                      value={this.state.email}
                      onChange={this.onInputChange}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      type="password"
                      className="input"
                      id="newpassword"
                      placeholder="New password"
                      value={this.state.newpassword}
                      onChange={this.onInputChange}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-lock"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control">
                    <button className="btn btn-default btn-block log-in">
                      Login
                    </button>
                  </p>
                </div>
              </form>
    </div>
    );
  }
}

export default ForgotPasswordVerification;