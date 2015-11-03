(function() {
	'use strict';
	angular.module('app')
	.factory('HomeFactory', HomeFactory);

	HomeFactory.$inject = ['$http', '$q'];

	function HomeFactory($http, $q) {
		var o = {};


		function getAuth() {
			var auth = {
				headers: {
					Authorization: "Bearer " +
					localStorage.getItem("token")
				}
			}
			return auth ;
		}

		o.getUsers = function() {
			var q = $q.defer() ;
			$http.get('/api/user').success(function(res) {
				q.resolve(res)
			}) ;
			return q.promise ;
		}

		o.getActiveUsers = function() {
			console.log("DEBUG: HomeFactory: o.getActiveUsers called") ;
			var q = $q.defer() ;
			$http.get('/api/user/getConvos/').success(function(res) {
				q.resolve(res) ;
			}) ;
			return q.promise ;
		}

		o.createMessage = function(message) {
			var q = $q.defer() ;
			$http.post('/api/conversation/post', message, getAuth()).success(function(res) {
				q.resolve(res) ;
			})
			return q.promise ;
		}

		o.getMessages = function(senderId, recipientId) {
			console.log("HomeFactory o.getMessages") ;
			var q = $q.defer() ;
			$http.post('api/conversation/get', {sender: senderId, recipient: recipientId}).success(function(res) {
				q.resolve(res) ;
			})
			return q.promise ;
		}
		
		return o;
	}
})();