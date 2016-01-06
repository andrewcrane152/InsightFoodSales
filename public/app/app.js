var app = angular.module('Insight', ['ngRoute', 'ngMaterial']);

app.config(function($routeProvider, $httpProvider){
	$routeProvider
	.when('/main', {
		templateUrl: 'app/views/main.html',
		controller: 'mainCtrl'
	})

	.otherwise({
		redirectTo: '/main'
	});

	$httpProvider.defaults.useXDomain = true;
});
