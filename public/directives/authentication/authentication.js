angular.module('pollApp')
	.directive('authentication', function($rootScope, jwtHelper, User, Session, $state, store) {
		return {
			restrict: 'E',
			templateUrl: 'directives/authentication/authentication.html',
			replace: true,
			scope: {
				mode: '@'
			},
			link: function($scope, element, attribute) {
				$scope.new_user = {};
				$scope.user = {};
				$scope.signup_submit = function() {
					var u = new User($scope.new_user);
					u.$save(function (response, headers) {
						if (response.status == 'error')
							alert(response.message);
						else
							$state.go('main.login');
					}, function (error) {
						console.log("Error in server...");
					});
				};
				$scope.login_submit = function() {
					var s = new Session($scope.user);
					s.$save(function (response, headers) {
						if (response.status == 'error')
							alert(response.message);
						else {
							store.set('poll_token', response.token);
							$rootScope.update_user();
							$state.go('main.polls');
						}
					}, function (error) {
						console.log("Error in server...");
					});
				};
			}
		};
	});