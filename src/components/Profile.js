import React, { Component } from 'react';
import logo from '../logo.svg';

class Profile extends Component{
    render() {
        return (
            <div className="ui divided items App">
                <div className="item">
                    <div className="middle aligned content">
                        <img src={logo} className="App-logo" alt="logo"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile;