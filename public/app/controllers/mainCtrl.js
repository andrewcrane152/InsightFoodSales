angular.module('Insight')
.controller('mainCtrl', function($scope, emailService){

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

  // $scope.showConfirmToast = function() {
  //   $mdToast.show(
  //     $mdToast.simple()
  //       .content('Email Sent')
  //       // .position($scope.getToastPosition())
  //       .hideDelay(3000)
  //   );
  // };

  // $scope.closeToast = function() {
  //   $mdToast.hide();
  // };

});