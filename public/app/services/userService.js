angular.module('Insight').service('userService', function($http) {
	this.adminLogin = function(email, password) {
		return $http({
			method: 'POST',
			url: '/login',
			data: { email: email, password: password }
		});
	};

	this.logout = function() {
		return $http({
			method: 'GET',
			url: '/logout'
		});
	};

	this.getUsers = function() {
		return $http({
			method: 'GET',
			url: '/users'
		});
	};

	this.createNewUser = function(name, email, password) {
		return $http({
			method: 'POST',
			url: '/users',
			data: { name: name, email: email, password: password }
		});
	};

	this.deleteUser = function(id) {
		return $http({
			method: 'DELETE',
			url: '/users/' + id
		});
	};

	this.updateUser = function(id, name, email, password) {
		return $http({
			method: 'PUT',
			url: '/users/' + id,
			data: { name: name, email: email, password: password }
		});
	};
});
