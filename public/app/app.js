var app = angular.module('Insight', ['ngRoute', 'ngMaterial']);

app.config(function($routeProvider, $httpProvider){
	$routeProvider
	.when('/main', {
		templateUrl: 'app/views/main.html',
		controller: 'mainCtrl',
		resolve: {
			aboutUsData: function (textFieldService) {
				return textFieldService.getAboutUs();
			},
			missionData: function (textFieldService) {
				return textFieldService.getMission();
			}
		}
	}).otherwise({
		redirectTo: '/main'
	});

	$httpProvider.defaults.useXDomain = true;
});
