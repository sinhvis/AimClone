(function() {
	"use strict";
	angular.module('app').controller('MessagingController', MessagingController) ;
	MessagingController.$inject = ['HomeFactory', '$state', '$stateParams'] ;

	function MessagingController(HomeFactory, $state, $stateParams) {
		var vm = this ;
		
		// if(!$stateParams.id) $state.go('Home') ;

		vm.createMessage = function() {
			console.log(vm.newMessage);
			
			HomeFactory.createMessage(vm.newMessage).then(function(res) {
				$state.go('Home') ;
			}) ;
		} ;
	} ;
})() ;