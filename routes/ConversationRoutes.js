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
	var body = req.body.message;
	var msg = new Conversation(req.body);
	msg.sender = req.payload.id;

	msg.messages[0] = body;
	
	msg.messages[0].date = new Date();
	msg.messages[0].sender = req.payload.id;

	msg.save(function(err, result){
		if(err) return res.status(500).send({err: 'Server Error'});
		if(err) return res.status(400).send({err: 'coudlnt add it'});
		id = result._id;
		
		User.update({_id: msg.sender }, {$push: { messages: {_id:id}}}, 
			function(err, result){
				User.update({_id: msg.recipient }, {$push: { messages: {_id:id}}}, 
					function(err, result) {
						res.send()
					});
			});
	});
});
		// function(err, movie) {
  //       res.send(result);
  //     });


module.exports = router;