angular.module('Insight')
.controller('mainCtrl', function($scope, $mdToast, emailService, mainService){

	(function($){
	  $(function(){

	    $('.button-collapse').sideNav();
	    $('.parallax').parallax();

	  }); // end of document ready
	})(jQuery); // end of jQuery name space


  $scope.sendEmail = function(contactName, fromEmail, messageSub, message) {
    emailService.sendEmail(contactName, fromEmail, messageSub, message)
    .then(function(response){
      $scope.contactName = '';
      $scope.fromEmail = '';
      $scope.messageSub = '';
      $scope.message = '';
    });
  };

  $scope.confirmEmail = function(contactName, fromEmail, messageSub, message) {
    emailService.confirmEmail(contactName, fromEmail, messageSub, message)
    .then(function(response){
      $scope.contactName = '';
      $scope.fromEmail = '';
      $scope.messageSub = '';
      $scope.message = '';
    });
  };

  $scope.openToast = function($event) {
    $mdToast.show(
      $mdToast.simple()
        .content('Email Sent')
        .hideDelay(3000)
    );
  };

  $scope.closeMenuBar = function () {
    console.log('closeMenuBar invoked');
    $('#mobile-demo').sideNav('hide');
  };


  $scope.adminLogin = function (credentials) {
    mainService.adminLogin(credentials).then(function(response){
      console.log('logged in');
    }, function(error){
      console.log('login error ', error);
    });
  };

	$scope.createNewUser = function (newUser) {
		mainService.createNewUser(newUser).then(function(response){
				toast("New User Added");
	    }, function(error){
				Materialize.toast("Error occured while adding user.", 1500);
			});
	};

	$scope.updateUser = function (updatedUser) {
		mainService.updateUser(updatedUser).then(function(response){
				Materialize.toast("User Updated", 1500);
			}, function(error){
				Materialize.toast("Error occured while updating user.", 1500);
			});
	};

	$scope.deleteUser = function (user) {
		var userId = user.userId;
		if(confirm("Are you sure you want to delete this user?")){
			mainService.deleteUser(userId).then(function(response){
				Materialize.toast("User Deleted", 1500);
			}, function(error){
				Materialize.toast("Error occured while adding user.", 1500);
			});
		}
	};

});
