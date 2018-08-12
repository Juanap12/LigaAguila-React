import React, { Component } from "react";

import firebase from 'firebase/app';
import {DB_CONFIG} from '../../config/config';
import 'firebase/database';
import 'firebase/storage';

import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class AddTeamForm extends Component {
  constructor() {
    super();

    this.state = {
      teamKey: "",
      teamFullName: "",
      teamShortName: "",
      teamGround: "",
      teamLocation: "",
      teamLogoFile: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    if (!firebase.apps.length) {
      firebase.initializeApp(DB_CONFIG);
    }
    this.firebaseDatabase = firebase.database();
    this.firebaseStorage = firebase.storage();
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleFileChange(e) {
    this.setState({
      teamLogoFile: e.target.files[0]
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const teamsReference = this.firebaseDatabase.ref("teams");
    const team = {
      teamFullName: this.state.teamFullName,
      teamShortName: this.state.teamShortName,
      teamGround: this.state.teamGround,
      teamLocation: this.state.teamLocation
    };
    const newTeamKey = teamsReference.push(team).key;

    const firebaseLogoReference = this.firebaseStorage.ref(
      "teamLogos/" + newTeamKey
    );
    firebaseLogoReference
      .put(this.state.teamLogoFile);

    this.setState({
      teamKey: "",
      teamFullName: "",
      teamShortName: "",
      teamGround: "",
      teamLocation: "",
      teamLogoFile: null
    });
  }


  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label for="team-fullname">Team full name</Label>
          <Input
            type="text"
            name="teamFullName"
            id="team-fullname"
            placeholder="The team full name"
            onChange={this.handleChange}
            value={this.state.teamFullName}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="team-shortname">Team short name</Label>
          <Input
            type="text"
            name="teamShortName"
            id="team-shortname"
            placeholder="The team short name"
            onChange={this.handleChange}
            value={this.state.teamShortName}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="team-ground">Team ground</Label>
          <Input
            type="text"
            name="teamGround"
            id="team-ground"
            placeholder="The team ground/stadium name"
            onChange={this.handleChange}
            value={this.state.teamGround}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="team-location">Team location</Label>
          <Input
            type="text"
            name="teamLocation"
            id="team-location"
            placeholder="Where the team is based in"
            onChange={this.handleChange}
            value={this.state.teamLocation}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="team-logo" id="teamLogo-label">
            Team logo
          </Label>
          <Input
            type="file"
            name="teamLogoFile"
            id="team-logo"
            aria-labelledby="teamLogo-label teamLogo-description"
            onChange={this.handleFileChange}
            required
          />
          <FormText id="teamLogo-description" color="muted">
            Upload a image file of the team logo.
          </FormText>
        </FormGroup>
        <Button>Create team</Button>
      </Form>
    );
  }
}

export default AddTeamForm;
