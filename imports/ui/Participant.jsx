import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Participants } from '../api/participants.js';

// Task component - represents a single todo item
export default class Participant extends Component {
  constructor(props) {
    super(props);

    this.state = { reviewedState: "Not Reviewed" };
    this.handleChange = this.handleChange.bind(this);
    this.setReviewedState = this.setReviewedState.bind(this);
  }
  setReviewedState() {
    Meteor.call('participants.setReviewed', this.props.participant._id, this.state.reviewedState);
    console.log('setReviewed has been called with: ' + this.state.reviewedState);
  }

  handleChange(event) {
    this.setState({ reviewedState: event.target.value }, function() { this.setReviewedState(); });

  }

  renderReviewSelect() {
    return (
      <select value={this.state.reviewedState} onChange={this.handleChange}>
        <option value="Not Reviewed">Not Reviewed</option>
        <option value="Reviewed - Not Accepted">Reviewed - Not Accepted</option>
        <option value="Reviewed - Accepted">Reviewed - Accepted</option>
      </select>
    );
  }

  render() {
    const participantClassNames = {
      "Not Reviewed": "",
      "Reviewed - Accepted": "success",
      "Reviewed - Not Accepted": "danger"
    }
    const participantClassName = participantClassNames[this.props.participant.reviewedState];
    const hasSiblingsTD = (this.props.participant.hasSiblings) ? <td>&#x2714;</td> : <td/>

    return (
      <tr className={participantClassName}>
        <td>{this.props.participant.name}</td>
        <td>{this.props.participant.age}</td>
        {hasSiblingsTD}
        <td>{this.props.participant.envExposures}</td>
        <td>{this.props.participant.genMutations}</td>
        <td>{this.props.participant.reviewedState === "Not Reviewed"? this.renderReviewSelect() : this.props.participant.reviewedState}</td>
      </tr>
    );
  }
}

Participant.propTypes = {
  participant: PropTypes.object.isRequired
};
