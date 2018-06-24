import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import '/lib/namespace.js';

// assign collection to the `messages` helper in `chatBox` template
Template.chatBox.helpers({
  "messages": function() {
    return chatCollection.find();
  }
});

// generate a value for the `user` helper in `chatMessage` template
Template.chatMessage.helpers({
  "user": function() {
    return this.userId;
  }
});

// when `Send Chat` clicked, add the typed chat message into the collection
Template.chatBox.events({
  "click #send": function() {
    var message = $('#chat-message').val();
    chatCollection.insert({
      userId: 'me',
      message: message
    });
    $('#chat-message').val('');
  }
});
