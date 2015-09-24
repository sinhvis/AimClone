var mongoose = require('mongoose') ;

var ConversationSchema = new mongoose.Schema({
	sender: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	recipient: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	messages: Array
}) ;

// messages Array is [body, sender, date]

mongoose.model('Conversation', ConversationSchema) ;