angular.module('app.components')

.directive( 'messages', function () {
	return {
		restrict: 'EA',
		//replace: true,
		scope: {
			messagesData: '='
		},
		templateUrl: 'common/components/messages-directive/messages-directive-template.html',
		link: function(scope) {

			scope.getMessageStyle = function(messageType) {
				if (messageType === "error")			return "flash-error";
				else if (messageType === "success")		return "flash-success";
				return null;
			};

			// scope.getMessage = function(data) {
			// 	//console.log("getMessage");
			// 	//console.log(data);

			// 	return data.message;
			// };
		}
	};
});