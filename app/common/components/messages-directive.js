angular.module('app.components')

.directive( 'messages', function () {
	return {
		restrict: 'EA',
		//replace: true,
		scope: {
			messagesData: '='
		},
		templateUrl: 'common/components/messages-directive-template.html',
		link: function(scope) {

			scope.getMessageStyle = function(messageType) {
				if (messageType === "error")			return "bg-danger";
				else if (messageType === "success")		return "bg-success";
				return null;
			};

			scope.getMessage = function(data) {
				var message = data.response.data.message;
				return message;
			};
		}
	};
});