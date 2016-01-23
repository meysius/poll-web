var app = angular.module('pollApp', [
	'ui.router',
	'ngResource',
	'angular-storage',
	'angular-jwt'
]);
app.value('RESTApiPath', 'http://localhost:3000/api');