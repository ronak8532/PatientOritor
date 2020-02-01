import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import toaster from "toasted-notes"; 
import 'toasted-notes/src/styles.css';

export default class Dashboard extends Component {

    handleLogOut = async event => {
        event.preventDefault();
        try{
            Auth.signOut();
            this.props.auth.setAuthStatus(false);
           this.props.auth.setUser(null);
        }catch(err){
            toaster.notify(err.message, {
                position: 'top-right', // top-left, top, top-right, bottom-left, bottom, bottom-right
                duration: 2000 // This notification will not automatically close
              })
        }
    }

    render(){
        return (
            <section className="section auth">
              <div className="container">
                   {this.props.auth.isAuthenticated && this.props.auth.user && (
                        <p>Hello {this.props.auth.user.username}</p>
                    )}
                <h1>Welcome!</h1>
                <p>You have successfully registered a new account.</p>
              </div>
              {this.props.auth.isAuthenticated && (
                    <div>
                    <a href='/sign-in' className="buttom">
                        Log out
                    </a>
                    </div>
                )}
            </section>
               
          )
    }
  
}