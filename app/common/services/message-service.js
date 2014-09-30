angular.module('app.common')

.factory('MessageService', function($log) {

	// Used in Utils.getFunctionName()
	function MessageService() { }
	var instance = new MessageService();
	instance.messages = [];

	// Constants
	instance.messageTypes = {};
	instance.messageTypes.ERROR = "error";
	instance.messageTypes.SUCCESS = "success";

	instance.addServiceErrorMessage = function(response, rejection) {

		var data = {};
		data.response = response;
		data.messageType = instance.messageTypes.ERROR;

		var defaultMessage = "A bad thing happened.";
		var  message = defaultMessage;

		// In the case of a status 500 (Internal Server Error)
		if ( response.data.message && response.data.message !== "" )	
			message = response.data.message;

		// 200 == "OK", so don't report. More info: http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
		if ( response.status !== 200 && response.statusText && response.statusText !== "" ) {
			message += " - "+ response.status + " : " + response.statusText;
		}

		var funcName;
		if ( response.config !== undefined ) {
			if ( response.config.funcName !== undefined ) {
				funcName = response.config.funcName;
			}
			// In the event of responseError (**Note** response format seems a little weird here..?)
			else if ( response.config.data !== undefined && response.config.data.funcName !== undefined ) {
				funcName = response.config.data.funcName;
			}
		}

		if ( rejection ) {
			if ( message === defaultMessage ) {
				message = "API call rejected.";
			}
		}

		if ( funcName !== undefined ) {
			data.message = funcName + " : " + message;
		}

		$log.log("Error message:", data);
		instance.messages.push(data);
	};

	instance.addSuccessMessage = function(message) {
		
		var data = {};
		data.message = message;
		data.messageType = instance.messageTypes.SUCCESS;

		instance.messages.push(data);
	};

	return instance;
});