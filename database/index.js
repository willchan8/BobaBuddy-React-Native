const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/BobaBuddy', {useNewUrlParser: true});

mongoose.connection.on('error', () => {
  console.log('mongoose connection error');
});

mongoose.connection.once('open', () => {
  console.log('mongoose connected successfully');
});