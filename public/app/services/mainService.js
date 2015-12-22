angular.module('Insight');
app.service('mainService', function($http){
	this.createUser = function (newUser){
		console.log ('mainService service createUser funciton = ', newUser);
		return $http({
			method: 'POST',
			url: 'http://localhost:5000/user'
		})
	};

	this.adminLogin = function (credentials){
		console.log ('adminLogin AJAX request invoked', credentials);
		return $http({
			method: 'POST',
			url: 'http://localhost:5000/login'
		})
	}
})