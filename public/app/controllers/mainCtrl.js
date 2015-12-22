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

  $scope.createUser = function (newUser) {
    mainService.createUser(newUser).then(function(response){
      console.log('register.js ' + response);
    }, function(error){
      console.log(error);
    })
  };

  $scope.adminLogin = function (credentials) {
    mainService.adminLogin(credentials).then(function(response){
      console.log('logged in');
    }, function(error){
      console.log('login error ', error);
    })
  };

});