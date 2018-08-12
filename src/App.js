import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AddTeamForm from './components/AddTeamForm/AddTeamForm';
import ViewTeams from './components/ViewTeams/ViewTeams';

import { Nav, NavItem, NavLink } from 'reactstrap';

import { Route, Link } from 'react-router-dom';

class App extends Component {

  /*
  componentDidMount() {
    const {teams} = this.state;
    let teamsDatabaseReference = this.firebaseDatabase.ref('teams');
    teamsDatabaseReference.once('value').then(snapshot => {
      teams.push({
        fullName: snapshot.val()
      })
    });
    this.setState({teams});

    console.log(this.state.teams);
  }*/

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
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
          <Route path="/viewTeams" component={ViewTeams}/>
          <Route path="/addNewTeam" component={AddTeamForm}/>
        </div>
      </div>
    );
  }
}

export default App;
