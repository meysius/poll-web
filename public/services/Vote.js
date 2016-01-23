angular.module('pollApp')
	.factory('Vote', function ($resource, RESTApiPath) {
		return $resource(RESTApiPath + '/polls/:poll_id/votes/:vote_id', {poll_id: '@poll_id', vote_id: '@vote_id'}, {
			'update': {'method': 'PATCH'}
		});
	});