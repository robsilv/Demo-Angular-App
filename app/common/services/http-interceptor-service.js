angular.module('app.common')

.factory('HttpInterceptor', function($q, $log, MessageService) {

	var instance = { };

	instance.request = function(config) {

		// do something on success
		// $log.log('HttpInterceptor - request - config:');
		// $log.log(config);

		return config;
	};

	instance.requestError = function(rejection) {

		$log.error('HttpInterceptor - requestError - rejection:');
		$log.log(rejection);

		// do something on error
		// if (canRecover(rejection)) {
		// 	return rejection;//responseOrNewPromise;
		// }

		MessageService.addServiceErrorMessage(rejection);

		return $q.reject(rejection);
	};

	instance.response = function(response) {
		
		// $log.log('HttpInterceptor - response - response:');
		// $log.log(response);

		// This is the response for UserService.getUser() if the service is unavailable
		if ( response.data === "null") {
			$log.error('HttpInterceptor - response - error:');
			$log.log(response);

			MessageService.addServiceErrorMessage(response);

			// No data.error.message in this instance
			return $q.reject("Service failed to return data");
		}

		// Do nothing if "OK" so that the Service can handle the successful response
		else if ( response.data.status === "OK") {
			// $log.log('HttpInterceptor - response - success:');
			// $log.log(response);

			return response;
		}
		// Handle the "ERROR" here so that each call in every Service doesn't need to
		else if ( response.data.status === "ERROR" ) {
			$log.error('HttpInterceptor - response - error:');
			$log.log(response);

			MessageService.addServiceErrorMessage(response);

			return $q.reject(response.data.error.message);
		}

		// do something on success
		return response;
	};

	instance.responseError = function(rejection) {

		$log.error('HttpInterceptor - responseError - rejection:');
		$log.log(rejection);

		// do something on error
		// if (canRecover(rejection)) {
		// 	return rejection;//responseOrNewPromise;
		// }

		MessageService.addServiceErrorMessage(rejection, true);

		return $q.reject(rejection);
	};

	// function canRecover(value) {
	// 	return true;
	// }

	return instance;
})

.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('HttpInterceptor');
}]);