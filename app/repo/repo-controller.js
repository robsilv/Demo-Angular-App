angular.module('app.repo')

.controller('RepoController', function RepoController ($scope, $stateParams, $location, $log, GitHubService) {

	$scope.$watch('$parent.repos ', function() {
		
		if ( $scope.$parent.repos === undefined )	return;

		$log.log("RepoController - init()");

		if ( $stateParams.repo !== undefined ) {
			$scope.currentRepo = GitHubService.getRepoByName($stateParams.repo);

			$log.log("currentRepo", $scope.currentRepo);

			GitHubService.getData($scope.currentRepo.languages_url).then(function(result) {
				createPieChart(result);
			});
		}
	});

	function createPieChart(langData) {
		var w = 400;
		var h = 400;
		var r = h/2;
		var color = d3.scale.category20c();

		var data = [];
		var maxValue = 0;

		// First, determine the maxValue
		_.forEach(langData, function(value, key) { 
			maxValue = Math.max(value, maxValue);
		});

		// Next, don't show fractions that are less than 2%
		_.forEach(langData, function(value, key) { 
			var addData = false;
			
			if ( value !== maxValue ) {
				var pc = value / maxValue;
				if ( pc >= 0.02) {
					$log.log('maxValue '+maxValue+' value '+value+' % '+pc);
					addData = true;
				}
			} else {
				$log.log('maxValue '+maxValue+' is value '+value);
				addData = true;
			}

			if ( addData ) {
				$log.log(key, value); 
				data.push({"label":key, "value":value});
			}
		});

		// var data = [{"label":"Category A", "value":20}, 
		// 			{"label":"Category B", "value":50}, 
		// 			{"label":"Category C", "value":30}];


		var vis = d3.select('#chart').append("svg:svg").data([data]).attr("width", w).attr("height", h).append("svg:g").attr("transform", "translate(" + r + "," + r + ")");
		var pie = d3.layout.pie().value(function(d){return d.value;});

		// declare an arc generator function
		var arc = d3.svg.arc().outerRadius(r);

		// select paths, use arc generator to draw
		var arcs = vis.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class", "slice");
		arcs.append("svg:path")
		.attr("fill", function(d, i){
			return color(i);
		})
		.attr("d", function (d) {
			// log the result of the arc generator to show how cool it is :)
			//console.log(arc(d));
			return arc(d);
		});

		// add the text
		arcs.append("svg:text").attr("transform", function(d){
			d.innerRadius = 0;
			d.outerRadius = r;
			return "translate(" + arc.centroid(d) + ")";}).attr("text-anchor", "middle").text( function(d, i) {
				return data[i].label;
			}
		);
	}	
});
