var mongoose = require('mongoose') ;

var ConversationSchema = new mongoose.Schema({
	createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	createdDate: Date,
	recipient: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	message: [{type: mongoose.Schema.Types.ObjectId, ref: 'Message'}]
}) ;

mongoose.model('Conversation', ConversationSchema) ;