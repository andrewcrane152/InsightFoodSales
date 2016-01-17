angular.module('Insight');
app.service('userService', function($http){

	this.adminLogin = function (loginEmail, loginPassword){
		console.log ('adminLogin invoked', loginEmail, loginPassword);
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

	this.updateUser = function(updatedUser){
		console.log('update user invoked ', updatedUser);
		return $http({
			method: 'PUT',
			url: '/users/' + updatedUser.userId,
			data: updatedUser
		});
	};

});