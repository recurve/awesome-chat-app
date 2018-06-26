import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import '/lib/namespace.js';

var badWordsFilter = require('swearjar');

// assign collection to the `messages` helper in `chatBox` template
Template.chatBox.helpers({
  "messages": function() {
    return chatCollection.find();
  }
});

// generate a value for the `user` helper in `chatMessage` template
Template.chatMessage.helpers({
  "user": function() {
    var nickname = (this.userId)? 'user-' + this.userId : 'anonymous-' + this.subscriptionId;
    return nickname;
  }
});

// when `Send Chat` clicked, add the typed chat message into the collection
Template.chatBox.events({
  "click #send": function() {
    var message = $('#chat-message').val();
    message = badWordsFilter.censor(message);
    chatCollection.insert({
      userId: 'me',
      message: message
    });
    $('#chat-message').val('');

    //add the message to the stream
    chatStream.emit('chat', message);
  }
});

chatStream.on('chat', function(message) {
  chatCollection.insert({
    userId: this.userId, //this is the userId of the sender
    subscriptionId: this.subscriptionId, //this is the subscriptionId of the sender
    message: message
  });
});
