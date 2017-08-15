import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Participants = new Mongo.Collection('participants');

if (Meteor.isServer) {
  Meteor.publish('participants', function participantsPublication() {
    if (! Meteor.userId()) {
      return Participants.find({reviewedState: "Reviewed - Accepted"});
    } else {
      return Participants.find();
    }
  });
}

Meteor.methods({
  'participants.insert'(name, age, hasSiblings, envExposures, genMutations) {
    check(name, String);
    check(age, Number);
    check(hasSiblings, Boolean);
    check(envExposures, String);
    check(genMutations, String);

    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized', 'You are not authorized to add a new participant.');
    }

    Participants.insert({
      name,
      age,
      hasSiblings,
      envExposures,
      genMutations,
      reviewedState: "Not Reviewed",
      createdAt: new Date()
    });
  },
  'participants.setReviewed'(participantId, reviewedState) {
    check(participantId, String);
    check(reviewedState, String);

    if (["Not Reviewed","Reviewed - Accepted","Reviewed - Not Accepted"].indexOf(reviewedState) < 0) {
      throw new Meteor.Error('invalid-value', 'Invalid value for participant review state.');
    }

    const participant = Participants.findOne(participantId);
    if (participant.reviewedState !== "Not Reviewed") {
      throw new Meteor.Error('already-reviewed', 'Participant has already been reviewed. This cannot be undone.');
    }

    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized', 'You are not authorized to review participants.');
    }

    Participants.update(participantId, { $set: { reviewedState: reviewedState } });
  }
});
