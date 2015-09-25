(function() {
	'use strict';
	angular.module('app', ['ui.router'])
	.config(Config);
	Config.$inject = ['$stateProvider', '$urlRouterProvider'];
	function Config($stateProvider, $urlRouterProvider) {
		$stateProvider.state('Home',{
			url: '/',
			templateUrl: 'views/home.html',
			controller: "HomeController",
			controllerAs: "vm"
		}).state('RegisterUser', {
			url: '/Register',
			templateUrl: 'views/register_user.html'
		}).state('LoginUser', {
			url: '/Login',
			templateUrl: 'views/login_user.html'
		}).state('Profile', {
			url: '/Profile',
			templateUrl: 'views/profile.html',
			controller: 'ProfileController',
			controllerAs: 'vm'
		}).state('EditProfile', {
			url: '/EditProfile/:id',
			templateUrl: 'views/edit_profile.html',
			controller: 'ProfileController',
			controllerAs: 'vm'
		}).state('Messaging', {
			url: '/Message/:id/:recUN',
			templateUrl: 'views/messaging.html',
		}) ;
		$urlRouterProvider.otherwise('/');
	}
})();
