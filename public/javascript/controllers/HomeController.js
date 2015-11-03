(function() {
	'use strict';
	angular.module('app')
	.controller('HomeController', HomeController);

	HomeController.$inject = ['HomeFactory', "UserFactory", '$http', '$rootScope'];

	function HomeController(HomeFactory, UF, $http, root) {
		var vm = this;
		vm.title = 'WTracker';
		console.log("thingToLog")


		HomeFactory.getUsers().then(function(res) {
			vm.users = res ;
			console.log(res) ;
		}) ;

		// $http.get('/api/user/getConvos/' + root._user.id).then(function(successRes) {
		// 	vm.convos = successRes.data.convos;
		// 	console.log(vm.convos) ;
		// }) ;

vm.userArray = [] ;
$http.get('/api/user/getConvos/' + root._user.id).then(function(successRes) {
	vm.convos = successRes.data.convos;
	console.log(vm.convos) ;

			// vm.convos has both recipient and sender ids
			for(var i = 0; i < vm.convos.length; i++) {

				// Getting recipient users
				$http.get('/api/user/' + vm.convos[i].recipient).then(function(res) {
					vm.userArray.push(res.data) ;
					removeLoggedInUser(vm.userArray, root._user.id) ;
				}) ;

				// Getting sender users
				$http.get('/api/user/' + vm.convos[i].sender).then(function(res) {
					vm.userArray.push(res.data) ;
					removeLoggedInUser(vm.userArray, root._user.id) ;
				}) ;
			}
			
			// console.log(vm.userArray) ;
			// console.log("DEBUG: HomeController: vm.userArray: ", vm.userArray) ;

			// // Need to remove root._user.id from vm.userArray
			// var senderId = root._user.id ;
			// for(var i = 0; i < vm.userArray.length; i++) {
			// 	if(vm.userArray[i] === senderId) {
			// 		vm.userArray.splice(i, 1) ;
			// 	}
			// }


		}) ;



function removeLoggedInUser(userArray, loggedInId) {
	for(var i = 0; i < userArray.length; i++) {
		if(userArray[i]._id === loggedInId) {
			vm.userArray.splice(i, 1) ;
		}
	}
}
}
})();