import React, { Component } from 'react';
import logo from './LigaAguilaLogo.svg';
import './App.css';
import AddTeamForm from './components/AddTeamForm/AddTeamForm';
import ViewTeams from './components/ViewTeams/ViewTeams';

import { Nav, NavItem, NavLink } from 'reactstrap';

import { Route, Link } from 'react-router-dom';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-leagueLogo" alt="logo" />
          <h1 className="App-title">My Football League</h1>
        </header>
        <Nav tabs>
          <NavItem>
            <NavLink href="/viewTeams">View Teams</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/addNewTeam">Add New Team</NavLink>
          </NavItem>
        </Nav>
        <div>
          <Route exact path="/" component={ViewTeams}/>
          <Route path="/viewTeams" component={ViewTeams}/>
          <Route path="/addNewTeam" component={AddTeamForm}/>
        </div>
      </div>
    );
  }
}

export default App;
