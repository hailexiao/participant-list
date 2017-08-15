import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';

export default class NewParticipantModal extends Component {
  handleSubmit(event) {
    event.preventDefault();
    const name = ReactDOM.findDOMNode(this.refs.name).value.trim();
    const age = parseInt(ReactDOM.findDOMNode(this.refs.age).value);
    const hasSiblings = ReactDOM.findDOMNode(this.refs.hasSiblings).checked;
    const environmentalExposures = ReactDOM.findDOMNode(this.refs.environmentalExposures).value;
    const geneticMutations = ReactDOM.findDOMNode(this.refs.geneticMutations).value;

    Meteor.call('participants.insert', name, age, hasSiblings, environmentalExposures, geneticMutations);

    ReactDOM.findDOMNode(this.refs.name).value = '';
    ReactDOM.findDOMNode(this.refs.age).value = '';
    ReactDOM.findDOMNode(this.refs.name).checked = false;
    ReactDOM.findDOMNode(this.refs.environmentalExposures).value = '';
    ReactDOM.findDOMNode(this.refs.geneticMutations).value = '';

    $('#newParticipantModal').modal('hide');
  }
  render() {
    return (
      <div className="modal fade" id="newParticipantModal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add a New Participant</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form id="new-participant-form" onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-group">
                  <label htmlFor="participant-name" className="form-control-label">Name:</label>
                  <input type="text" className="form-control" id="participant-name" ref="name"></input>
                </div>
                <div className="form-group">
                  <label htmlFor="participant-age" className="form-control-label">Age</label>
                  <input type="number" className="form-control" id="participant-age" ref="age"></input>
                </div>
                <div className="checkbox">
                    <label htmlFor="has-siblings" className="form-control-label"><input type="checkbox" id="has-siblings" ref="hasSiblings"></input>Has Siblings?</label>
                </div>
                <div className="form-group">
                  <label htmlFor="environmental-exposures" className="form-control-label">Known Environmental Exposures</label>
                  <textarea className="form-control" id="environmental-exposures" ref="environmentalExposures"></textarea>
                </div>
                <div className="form-group">
                <label htmlFor="genetic-mutations" className="form-control-label">Known Genetic Mutations</label>
                <textarea className="form-control" id="genetic-mutations" ref="geneticMutations"></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="submit" form="new-participant-form" className="btn btn-primary">Add Participant</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
