import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import LinksPage from './LinksPage';
import LinkFormPage from './LinkFormPage';
import Profile from './Profile';
import '../App.css';

export default class App extends Component {
  render() {
    return (
      <div className="ui container">
        <div className="ui secondary pointing menu">
          <Link className='ui item' to="/">Home</Link>
          <Link className='ui item' to="/links/add">Add Links</Link>
        </div>
        <div className="ui centered grid">
          <div className="four wide column">
            <Profile/>
          </div>
          <div className="twelve wide column">
            <Route exact path='/' component={LinksPage}/>
            <Route path="/links/add" component={LinkFormPage} />
            <Route path="/links/edit/:id" component={LinkFormPage} />
          </div>
        </div>
      </div>
    );
  }
}