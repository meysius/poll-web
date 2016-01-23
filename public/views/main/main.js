angular.module('pollApp')
	.controller('MainCtrl', function($scope, $rootScope, store, jwtHelper, $state) {
		$rootScope.logged_in = false;
		$rootScope.email = '';
		$rootScope.update_user = function() {
			token = store.get('poll_token');
			if (token) {
				$rootScope.logged_in = true;
				$rootScope.email = jwtHelper.decodeToken(token)['email'];
			} else {
				$rootScope.logged_in = false;
				$rootScope.email = '';
			}
		};
		$rootScope.confirm_logged_in = function() {
			if(!$rootScope.logged_in) {
				$state.go('main.login');
			}
		}
		$rootScope.update_user();
	});