angular.module('Insight');
app.service('mainService', function($http){

	this.adminLogin = function (credentials){
		console.log ('adminLogin invoked', credentials);
		return $http({
			method: 'POST',
			url: 'http://localhost:5000/login'
		});
	};

	this.createNewUser = function(newUser){
		console.log('create new user invoked', newUser);
		return $http({
			method: 'POST',
			url: '/users',
			data: newUser
		});
	};

	this.deleteUser = function(userId){
		console.log('delete user invoked ', userId);
		return $http({
			method: 'DELETE',
			url: '/users/' + userId
		});
	};

	this.updateUser = function(updatedUser){
		console.log('update user invoked ', updatedUser);
		return $http({
			method: 'PUT',
			url: '/users/' + updatedUser.userId,
			data: updatedUser
		});
	};

});
