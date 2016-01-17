angular.module('Insight');
app.service('userService', function($http, $q){

	var currentUser;

	this.adminLogin = function (loginEmail, loginPassword){
		var dfrd = $q.defer();
		return $http({
			method: 'POST',
			url: '/login',
			data: {
				email: loginEmail,
				password: loginPassword,
			}
		});
	};

	this.logout = function () {
		console.log ('logout invoked');
		return $http({
			method: 'GET',
			url: '/logout'
		});
	};

	this.createNewUser = function(newUserName, newUserEmail, newUserPassword){
		return $http({
			method: 'POST',
			url: '/users',
			data: {
				name: newUserName,
				email: newUserEmail,
				password: newUserPassword,
				visible: true,
			}
		});
	};

	this.deleteUser = function(userId){
		console.log('delete user invoked ', userId);
		return $http({
			method: 'DELETE',
			url: '/users/' + userId
		});
	};

	this.updateUser = function(userId, newName, newEmail, newPassword){
		console.log('update user invoked ', userId, newName, newEmail, newPassword);
		return $http({
			method: 'PUT',
			url: '/users/' + userId,
			data: {
				name: newName,
				email: newEmail,
				password: newPassword,
			}
		});
	};

	this.getUsers = function(){
		return $http({
			method: 'GET',
			url: '/users'
		});
	}

});
