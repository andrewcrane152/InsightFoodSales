var app = angular.module('Insight', ['ngRoute', 'ngMaterial']);

app.config(function($routeProvider, $httpProvider){
	$routeProvider
	.when('/main', {
		templateUrl: 'app/views/main.html',
		controller: 'mainCtrl',
		resolve: {
			aboutUs: function (contentService) {
				return contentService.get('about');
			},
			mission: function (contentService) {
				return contentService.get('mission');
			},
			mfgrs: function(mfgrsService) {
				return mfgrsService.getAll();
			}
		}
	}).otherwise({
		redirectTo: '/main'
	});

	$httpProvider.defaults.useXDomain = true;
});
