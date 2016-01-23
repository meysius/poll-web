angular.module('pollApp')
	.controller('AuthenticationCtrl', function($scope, $stateParams) {
		$scope.mode = $stateParams.mode;
	});