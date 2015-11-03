var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Conversation = mongoose.model('Conversation') ;
var jwt = require('express-jwt')  ;

var auth = jwt({
	'userProperty' : 'payload',
	'secret' : '_secret_sauce'
}) ;

router.post('/post', auth, function(req, res) {
	// Construct object for saving to database
	// var body = req.body.message;
	// var msg = new Conversation(req.body);
	// msg.sender = req.payload.id;

	
	req.body.date = new Date();




	Conversation.update({_id:  req.body.conversation }, {$push:{messages: req.body}}, function(err, conversation) {
		if(err) return res.status(500).send({err: 'Server Error'});
		if(err) return res.status(400).send({err: 'Could not add it'});
		res.send() ;
	});
});





router.post('/get', function(req, res) {
	Conversation.findOne({sender: req.body.sender, recipient: req.body.recipient}, function(err, conversation) {
		if(err) return res.status(500).send({ err: "Server error on getting conversation" }) ;
		if (conversation) {
			console.log("Conversation found: \n", conversation) ;
			return res.send(conversation) ;
		}
		if(!conversation) {
			Conversation.findOne({ sender: req.body.recipient, recipient: req.body.sender }, function(err, conversation) {
				if(err) return res.status(500).send({ err: "Server error on getting conversation with roles reversed" });
				if (conversation) {
					console.log("Conversation found with roles reversed\n", conversation) ;
					return res.send(conversation) ;
				}
				else{
					var newConversation = new Conversation({ sender: req.body.sender, recipient: req.body.recipient }) ;
					newConversation.save(function (err, result) {
						if(err) return res.status(500).send({ err: "Server error on creating new conversation" }) ;
						User.update({ _id: req.body.sender}, {$push: {messages: result._id}}, function(err, result) {
							if(err) return res.status(500).send({ err: "Error saving conversation to user." }) ;

						})

						User.update({ _id: req.body.recipient}, {$push: {messages: result._id}}, function(err, result) {
							if(err) return res.status(500).send({ err: "Error saving conversation to recipient." }) ;

						})
						console.log("New conversation made\n", result) ;
						res.send(result) ;
					})
				}
			}) 
}
})
});



module.exports = router;