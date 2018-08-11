import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import firebase from 'firebase/app';
import {DB_CONFIG} from './config/config';
import 'firebase/database';
import 'firebase/storage';

import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class App extends Component {

  constructor(){
    super();
    
    this.state = {
      teamKey: '',
      teamFullName: '',
      teamShortName: '',
      teamGround: '',
      teamLocation: '',
      teamLogoFile: null,
      teams: [

      ]
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    if(!firebase.apps.length){
      firebase.initializeApp(DB_CONFIG);
    }
    this.firebaseDatabase = firebase.database();
    this.firebaseStorage = firebase.storage();
  }

  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleFileChange(e){
    this.setState({
      teamLogoFile: e.target.files[0]
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const teamsReference = this.firebaseDatabase.ref('teams');
    const team = {
      teamFullName: this.state.teamFullName,
      teamShortName: this.state.teamShortName,
      teamGround: this.state.teamGround,
      teamLocation: this.state.teamLocation
    }
    const newTeamKey = teamsReference.push(team).key;

    const firebaseLogosReference = this.firebaseStorage.ref('teamLogos/'+newTeamKey);
    firebaseLogosReference.put(this.state.teamLogoFile).then(snapshot => alert("Team logo uploaded"));

    this.setState({
      teamKey: '',
      teamFullName: '',
      teamShortName: '',
      teamGround: '',
      teamLocation: '',
      teamLogoFile: null
    });
    
  }

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
  }

  

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="team-fullname">Team full name</Label>
              <Input type="text" name="teamFullName" id="team-fullname" placeholder="The team full name" onChange={this.handleChange} value={this.state.teamFullName} required/>
            </FormGroup>
            <FormGroup>
              <Label for="team-shortname">Team short name</Label>
              <Input type="text" name="teamShortName" id="team-shortname" placeholder="The team short name" onChange={this.handleChange} value={this.state.teamShortName} required/>
            </FormGroup>
            <FormGroup>
              <Label for="team-ground">Team ground</Label>
              <Input type="text" name="teamGround" id="team-ground" placeholder="The team ground name" onChange={this.handleChange} value={this.state.teamGround} required/>
            </FormGroup>
            <FormGroup>
              <Label for="team-location">Team location</Label>
              <Input type="text" name="teamLocation" id="team-location" placeholder="Where the team is based in" onChange={this.handleChange} value={this.state.teamLocation} required/>
            </FormGroup>
            <FormGroup>
              <Label for="team-logo"id="teamLogo-label">Team logo</Label>
              <Input type="file" name="teamLogoFile" id="team-logo" aria-labelledby="teamLogo-label teamLogo-description" onChange={this.handleFileChange} required/>
              <FormText id="teamLogo-description" color="muted">
                Upload a image file of the team logo.
              </FormText>
            </FormGroup>
            <Button>Create team</Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default App;
