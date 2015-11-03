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
				console.log("DEBUG: HomeController: vm.convos[" + i + "].recipient", vm.convos[i].recipient) ;

				$http.get('/api/user/' + vm.convos[i].recipient).then(function(res) {
					vm.userArray[i] = res.data ;
					console.log(vm.userArray.length) ;
				})
			}
		}) ;
}
})();