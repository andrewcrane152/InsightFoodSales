var app = angular.module('Insight', ['ngRoute', 'ngMaterial']);

app.config(function($routeProvider, $httpProvider){
	$routeProvider
	.when('/main', {
		templateUrl: 'app/views/main.html',
		controller: 'mainCtrl',
		resolve: {
			aboutUsData: function (contentService) {
				return contentService.get('about');
			},
			missionData: function (contentService) {
				return contentService.get('mission');
			}
		}
	}).otherwise({
		redirectTo: '/main'
	});

	$httpProvider.defaults.useXDomain = true;
});
