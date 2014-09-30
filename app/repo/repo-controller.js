angular.module('app.repo')

.controller('RepoController', function RepoController ($scope, $stateParams, $location, $log, GitHubService) {

	$scope.$watch('$parent.repos ', function() {
		
		if ( $scope.$parent.repos === undefined )	return;

		$log.log("RepoController - init()");

		if ( $stateParams.repo !== undefined ) {
			$scope.currentRepo = GitHubService.getRepoByName($stateParams.repo);

			$log.log("currentRepo", $scope.currentRepo);
		}
	});	
});
