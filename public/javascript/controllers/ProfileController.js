(function() {
	"use strict" ;
	angular.module('app').controller('ProfileController', ProfileController) ;

	ProfileController.$inject = ['UserFactory', '$state', '$stateParams', '$rootScope'] ;

	function ProfileController(UserFactory, $state, $stateParams, $rootScope) {
		var vm = this ;

		if(!$stateParams.id) {
			$state.go('Profile') ;
		} else {
			UserFactory.getUserLoggedIn($stateParams.id).then(function(res) {
				vm.user = res ;
			}) ;
		}

		// Checks if user is logged in
		if($rootScope._user) {
			UserFactory.getUserLoggedIn($rootScope._user.id).then(function(res) {
				vm.userLoggedIn = res ;
			})
		}

		vm.editProfile = function() {
			UserFactory.editProfile(vm.user) ;
			$state.go('Profile') ;
		} ;
	}
})() ;