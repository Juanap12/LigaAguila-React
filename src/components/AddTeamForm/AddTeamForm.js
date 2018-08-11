import React, { Component } from 'react';

class AddTeamForm extends Component {
    render() {
        return(
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
        );
    }
}

export default AddTeamForm;