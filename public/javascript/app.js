(function() {
	'use strict';
	angular.module('app', ['ui.router'])
	.config(Config);
	Config.$inject = ['$stateProvider', '$urlRouterProvider'];
	function Config($stateProvider, $urlRouterProvider) {
		$stateProvider.state('Home',{
			url: '/',
			templateUrl: 'views/home.html'
		}).state('RegisterUser', {
			url: '/Register',
			templateUrl: 'views/register_user.html'
		}).state('LoginUser', {
			url: '/Login',
			templateUrl: 'views/login_user.html'
		});
		$urlRouterProvider.otherwise('/');
	}
})();
