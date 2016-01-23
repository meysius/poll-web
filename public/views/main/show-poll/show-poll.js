angular.module('pollApp')
	.controller('ShowPollCtrl', function($scope, $rootScope, $stateParams, Poll, Vote) {
		$scope.poll = {};
		Poll.get({id: $stateParams.id}, function(response) {
			$scope.poll = response;
		});
		
		$scope.update_user_choice = function(option_id) {
			$rootScope.confirm_logged_in();
			v = new Vote({poll_id: $scope.poll.id, user_choice: option_id})
			v.$save(function (response, headers) {
				if (response.status == 'error') {
					alert(response.message);
				} else {
					$scope.decrement_vote();
					$scope.poll.user_choice = option_id;
					$scope.increment_vote();
				}	
			}, function (error) {
				console.log("Error in server...");
			});		
		};

		$scope.decrement_vote = function() {
			for (var i = 0; i < $scope.poll.options.length; i++) {
				if ($scope.poll.options[i].id == $scope.poll.user_choice)
					$scope.poll.options[i]['votes_count']--;
			}
		};

		$scope.increment_vote = function() {
			for (var i = 0; i < $scope.poll.options.length; i++) {
				if ($scope.poll.options[i].id == $scope.poll.user_choice)
					$scope.poll.options[i]['votes_count']++;
			}
		};
	});