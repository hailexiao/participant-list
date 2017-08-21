import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Participants } from '../api/participants.js';

import Participant from './Participant.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import NewParticipantModal from './NewParticipant.jsx';

// App component - represents the whole app
class App extends Component {
  renderParticipants() {
    let participants = this.props.participants;
    return participants.map((participant) => {
      return (
        <Participant
          key={participant._id}
          participant={participant}
        />
      );
    });
  }

  renderModal() {
    $('#newParticipantModal').modal();
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Participants</h1>

          <AccountsUIWrapper />
        </header>

        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Has Siblings?</th>
              <th>Known Environmental Exposures</th>
              <th>Known Genetic Mutations</th>
              <th>Current Status</th>
            </tr>
          </thead>
          <tbody>
            {this.renderParticipants()}
          </tbody>
        </table>
        <button
          type="button"
          className="btn btn-info btn-lg"
          id="newParticipantBtn"
          disabled={!this.props.currentUser}
          onClick={this.renderModal}
          >Add Participant</button>
        <NewParticipantModal />
      </div>
    );
  }
}

App.propTypes = {
  participants: PropTypes.array.isRequired
};

export default createContainer(() => {
  Meteor.subscribe('participants');

  return {
    participants: Participants.find({}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: Meteor.user()
  };
}, App);
