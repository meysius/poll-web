angular.module('pollApp')
	.config(function($locationProvider, $stateProvider, $urlRouterProvider, $httpProvider, jwtInterceptorProvider) {
		jwtInterceptorProvider.tokenGetter = function(store) {
			return store.get('poll_token');
		};
		$httpProvider.interceptors.push('jwtInterceptor');
		
		$locationProvider.html5Mode(true);
		$urlRouterProvider.otherwise('/polls');
		$stateProvider
			.state('main', {
				abstract: true,
				controller: 'MainCtrl',
				templateUrl: 'views/main/main.html'
			})
			.state('main.polls', {
				url: '/polls',
				controller: 'PollsCtrl',
				templateUrl: 'views/main/polls/polls.html'
			})
			.state('main.new_poll', {
				url: '/polls/new',
				controller: 'NewPollCtrl',
				templateUrl: 'views/main/new-poll/new-poll.html'
			})
			.state('main.show_poll', {
				url: '/polls/:id',
				controller: 'ShowPollCtrl',
				templateUrl: 'views/main/show-poll/show-poll.html'
			})
			.state('main.login', {
				url: '/login',
				params: {
					mode: 'login'
				},
				controller: 'AuthenticationCtrl',
				templateUrl: 'views/main/authentication/authentication.html'
			})
			.state('main.signup', {
				url: '/signup',
				params: {
					mode: 'signup'
				},
				controller: 'AuthenticationCtrl',
				templateUrl: 'views/main/authentication/authentication.html'
			});
	});