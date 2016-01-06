angular.module('Insight')
.controller('mainCtrl', function($scope, $mdToast, $http, emailService, mainService){

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

	$scope.initUpload = function() {
		console.log($scope.file);
		var file = document.getElementById('file').files[0];
		// if(!file) return;
		var reader = new FileReader();
		reader.onloadend = function(e){
			var data = e.target.result;
			$http({
				method: 'GET',
				url: '/s3_signed_url?file_name=' + file.name
			}).then(function successCallback(response) {
				console.log(response);
				url = response.url;
				data = new FormData();
				data.append('file', file.blob, file.name);
				$http({
					method: 'PUT',
					url: response.signed_request,
					data: data,
					withCredentials: true
				}).then(function successCallback(response) {
					console.log(response);
				}, function errorCallback(response) {
	    		console.log(response);
			  });
			}, function errorCallback(response) {
    		console.log(response);
		  });
		};
		reader.readAsBinaryString(file);
	};

	// function upload_file(file, signed_request, url){
  //     var xhr = new XMLHttpRequest();
  //     xhr.open("PUT", signed_request);
  //     xhr.setRequestHeader('x-amz-acl', 'public-read');
  //     xhr.onload = function() {
  //         if (xhr.status === 200) {
  //             document.getElementById("preview").src = url;
  //             document.getElementById("avatar_url").value = url;
  //         }
  //     };
  //     xhr.onerror = function() {
  //         alert("Could not upload file.");
  //     };
  //     xhr.send(file);
  // }

	// <h2>Your information</h2>
	//
	// <form method="POST" action="/submit_form/">
	//     <input type="hidden" id="avatar_url" name="avatar_url" value="/images/default.png" />
	//     <input type="text" name="username" placeholder="Username" /><br />
	//     <input type="text" name="full_name" placeholder="Full name" /><br /><br />
	//
	//     <hr />
	//     <h2>Save changes</h2>
	//
	//     <input type="submit" value="Update profile" />
	// </form>

});
