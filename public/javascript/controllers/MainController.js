(function() {
	"use strict" ;
	angular.mobile('app').controller('MainController', MainController) ;

	MainController.$inject = ["UserFactory", "$rootScope"] ;

	function MainController(UserFactory, $rootScope) {
		var vm = this ;
		vm.title = "AIM Clone" ;
		

		vm.getUsers = function() {
			UserFactory.getUsers().then(function(res) {
				vm.users = res ;
			}) ;
		} ;
	}
})() ;