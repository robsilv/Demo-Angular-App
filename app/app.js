angular.module( 'app', [
	'templates',
	'app.user',
	'app.repo',
	'app.common',
	'app.components',
	'ui.router',
	'angular-loading-bar'
])

.constant('config', {
	site: {

	},
	api: {
		root: 'https://api.github.com',
		users: '/users',
		config: {}
	}
})

.config( function appConfig ( $stateProvider, $urlRouterProvider, $locationProvider, cfpLoadingBarProvider ) {

	cfpLoadingBarProvider.includeSpinner = false;

	$urlRouterProvider.when("/user/{username}", "/user/{username}/repos");

	$stateProvider
		.state('user', {
			url: '/user/{username}',
			controller: 'UserController',
			templateUrl: 'user/user-template.html',
			data: {
				pageTitle: 'User'
			}
		})
		.state('user.repos', {
			url: '/repos',
			controller: 'ReposController',
			templateUrl: 'user/repos/repos-template.html',
			data: {
				pageTitle: 'Repository'
			}
		})
		.state('user.repo', {
			url: '/{repo}',
			controller: 'RepoController',
			templateUrl: 'repo/repo-template.html',
			data: {
				pageTitle: 'Repository'
			}
		});

	//$urlRouterProvider.otherwise('/feature1');

	$locationProvider.hashPrefix('!');
})

.run( function run ($rootScope) {

});

angular.module('app.user', []);
angular.module('app.repo', []);
angular.module('app.common', []);
angular.module('app.components', []);