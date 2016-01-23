angular.module('pollApp')
	.factory('Poll', function ($resource, RESTApiPath) {
		return $resource(RESTApiPath + '/polls/:id', {id: '@id'}, {
			'update': {'method': 'PATCH'}
		});
	});