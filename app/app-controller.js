angular.module('app')

.controller('AppController', function AppController ($scope, $log, $state, $stateParams, GitHubService, MessageService) {
	
	$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
		if (angular.isDefined(toState.data.pageTitle)) {
			$scope.pageTitle = toState.data.pageTitle;
		}
	});

	$scope.messages = MessageService.messages;

	$scope.submit = function() {
		if ($scope.username !== undefined &&
			$scope.username !== "") {

			$stateParams.username = $scope.username;
			$state.transitionTo('user', $stateParams);
		}
	};
});