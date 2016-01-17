angular.module('Insight')
.controller('userCtrl', function($scope, $mdToast, $http, userService){

    $scope.adminLogin = function (credentials) {
      userService.adminLogin(credentials).then(function(response){
        console.log('logged in');
      }, function(error){
        console.log('login error ', error);
      });
    };

    $scope.logout = function () {
      userService.logout().then(function(response){
        Materialize.toast("Logged Out", 1500);
      }, function(error){
        Materialize.toast("Log Out Failed", 1500);
      });
    };

    $scope.createNewUser = function (newUserName, newUserEmail, newUserPassword) {
      console.log("createNewUser ", newUserName, newUserEmail, newUserPassword);
      Materialize.toast("New User Added Invoked", 1500);
      userService.createNewUser(newUserName, newUserEmail, newUserPassword).then(function(response){
          Materialize.toast("New User Added", 1500);

        }, function(error){
          Materialize.toast("Error occured while adding user.", 1500);
        });
    };

    $scope.updateUser = function (updatedUser) {
      userService.updateUser(updatedUser).then(function(response){
          Materialize.toast("User Updated", 1500);
        }, function(error){
          Materialize.toast("Error occured while updating user.", 1500);
        });
    };

    $scope.deleteUser = function (user) {
      console.log('delete user invoked in controller');
      var userId = user.userId;
      if(confirm("Are you sure you want to delete this user?")){
        userService.deleteUser(userId).then(function(response){
          Materialize.toast("User Deleted", 1500);
        }, function(error){
          Materialize.toast("Error occured while adding user.", 1500);
        });
      }
    };


});
