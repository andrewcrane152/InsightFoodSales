angular.module('Insight')
.controller('mainCtrl', function($scope, mainService){

	(function($){
	  $(function(){

	    $('.button-collapse').sideNav();
	    $('.parallax').parallax();

	  }); // end of document ready
	})(jQuery); // end of jQuery name space


  $scope.sendEmail = function(contactName, fromEmail, messageSub, message) {
    mainService.sendEmail(contactName, fromEmail, messageSub, message)
    .then(function(response){
      $scope.contactName = '';
      $scope.fromEmail = '';
      $scope.messageSub = '';
      $scope.message = '';
    });
  };

  $scope.confirmEmail = function(contactName, fromEmail, messageSub, message) {
    mainService.confirmEmail(contactName, fromEmail, messageSub, message)
    .then(function(response){
      $scope.contactName = '';
      $scope.fromEmail = '';
      $scope.messageSub = '';
      $scope.message = '';
    });
  };

});