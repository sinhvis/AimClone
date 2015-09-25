(function() {
	"use strict";
	angular.module('app').controller('MessagingController', MessagingController) ;
	MessagingController.$inject = ['HomeFactory', '$state', '$stateParams', '$rootScope'] ;

	function MessagingController(HomeFactory, $state, $stateParams, $rootScope) {
		var vm = this ;
		vm.conversationId ;


		
		// if(!$stateParams.id) $state.go('Home') ;
		vm.getMessages = function() {
			HomeFactory.getMessages($rootScope._user.id, $stateParams.id).then(function(res) {
				console.log(res) ;
				vm.conversationId = res._id ;
				vm.msgArr = res.messages ;
			}) ;
		} ;

		vm.getMessages() ;

		vm.createMessage = function() {
			console.log(vm.newMessage);
			vm.newMessage.recipient = $stateParams.recUN ;
			vm.newMessage.sender = $rootScope._user.username ;
			vm.newMessage.conversation = vm.conversationId ;
			
			HomeFactory.createMessage(vm.newMessage).then(function(res) {
				// $state.go('Home') ;
				delete vm.newMessage ;
				vm.getMessages();
			}) ;
		} ;
	} ;
})() ;