var mongoose = require('mongoose') ;

var MessageSchema = new mongoose.Schema({
	messageBody: String;
	createdDate: Date,
	createdBy: {type: mongoose.Schema.Types.ObjectId, ref: User}
}) ;

mongoose.model("Message", MessageSchema) ;