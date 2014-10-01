angular.module('app.user')

.controller('UserController', function UserController ($scope, $log, $state, $stateParams, GitHubService) {

	if ( $stateParams.username !== undefined ) {

		$log.log("UserController");

		$scope.$parent.username = $stateParams.username;

		GitHubService.getUser($stateParams.username, true).then( function( result ) {
			$scope.user = result;
		});

		GitHubService.getRepositories($stateParams.username, true).then( function( result ) {
			$scope.repos = result;
		});		
	}

	$scope.goToRepo = function(repo) {
		
		$stateParams.username = $scope.$parent.username;
		$stateParams.repo = repo.name;
		$state.transitionTo('user.repo', $stateParams);
	};
});
