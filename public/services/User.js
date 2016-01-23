angular.module('pollApp')
	.factory('User', function ($resource, RESTApiPath) {
		return $resource(RESTApiPath + '/users/:id', {id: '@id'}, {
			'update': {'method': 'PATCH'}
		});
	});