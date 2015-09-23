(function() {
	'use strict';
	angular.module('app')
	.controller('HomeController', HomeController);

	HomeController.$inject = ['HomeFactory'];

	function HomeController(HomeFactory) {
		var vm = this;
		vm.title = 'AIM Clone';

		HomeFactory.getUsers().then(function(res) {
			vm.users = res ;
			console.log(res) ;
		}) ;
	}
})();