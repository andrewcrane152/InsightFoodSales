var app = angular.module('Insight', ['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
	.when('/main', {
		templateUrl: 'app/views/main.html',
		controller: 'mainCtrl'
	})

	.otherwise({
		redirectTo: '/main'
	});
});
