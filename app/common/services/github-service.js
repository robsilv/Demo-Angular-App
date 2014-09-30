angular.module('app.common')

.factory('GitHubService', function($q, $http, $log, config, Utils) {

	var urlBase = config.api.root + config.api.users;
	var config =  config.api.config;


	function GitHubService() { }
	var instance = new GitHubService();

	// For binding updates to work, the user must be an object
	// and not a primitive value (otherwise a copy and not a
	// reference will be established in the binding watch!
	// Ref: http://angular-tips.com/blog/2013/08/consuming-services/
	instance.user = { };
	instance.repositories = {};

	instance.getUser = function getUser(username, forceReload) {
		config.funcName = Utils.getFunctionName(this, arguments);
		
		if (!_.isEmpty(instance.user) && !forceReload) {
			return $q.when(instance.user);
		}

		$log.log('GitHubService - Loading user...');
		var promise = $http.get(urlBase + "/" + username, config)
		.then( function onSuccess(result) {
			instance.user = angular.copy(result.data);
			$log.log(' GitHubService - User loaded:', instance.user);
			return instance.user;	
		});

		return promise;
	};

	instance.getRepositories = function getRepositories(username, forceReload) {
		config.funcName = Utils.getFunctionName(this, arguments);
		
		if (!_.isEmpty(instance.repositories) && !forceReload) {
			return $q.when(instance.repositories);
		}

		$log.log('GitHubService - Loading repos...');
		var promise = $http.get(urlBase + "/" + username + "/repos", config)
		.then( function onSuccess(result) {
			instance.repositories = angular.copy(result.data);
			$log.log(' GitHubService - Repos loaded:', instance.repositories);
			return instance.repositories;
		});

		return promise;
	};

	instance.getRepoByName = function(name) {
		return _.find(instance.repositories, { name: name });
	};

	return instance;
});
