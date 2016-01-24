angular.module('Insight')
.controller('mainCtrl', function($scope, $mdToast, $http, emailService, mfgrsService, userService, contentService){
  $scope.triggerTitle = '(select name)';
  $scope.triggerEvent = '';

//////////////////////
//    SEND EMAIL    //
//////////////////////
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

// ////////////////////////
// //    USER CONTROL    //
// ////////////////////////
$scope.login = function (loginEmail, loginPassword) {
  $scope.closeThisModal('loginModal');
	userService.adminLogin(loginEmail, loginPassword).then(function(response){
		console.log("user ", response);
		$scope.user = response.data;
	}, function(error){
		Materialize.toast("Log In Failed", 3000);
	});
	userService.getUsers().then(function(response){
		console.log("allUsers ", response);
		$scope.allUsers = response;
	}, function(error){
		console.log(error);
	});
};

$scope.logout = function () {
	userService.logout().then(function(response){
		$scope.reloadPage();
	}, function(error){
		Materialize.toast("Log Out Failed", 3000);
	});
};

$scope.createNewUser = function (newUserName, newUserEmail, newUserPassword) {
	userService.createNewUser(newUserName, newUserEmail, newUserPassword).then(function(response){
			Materialize.toast("New User Added", 3000);
      userService.getUsers().then(function(response){
        console.log("allUsers ", response);
        $scope.allUsers = response;
      }, function(error){
        console.log(error);
      });
		}, function(error){
			Materialize.toast("Error occured while adding user.", 3000);
		});
};

$scope.updateUser = function (newName, newEmail, newPassword) {
	var userId = $scope.user._id;
	userService.updateUser(userId, newName, newEmail, newPassword)
		.success(function(response){
				$scope.user = response;
				Materialize.toast("User Updated", 3000);
				$scope.closeThisModal('updateUserModal');
			})
		.error(function(error){
				Materialize.toast("Error occured while updating user.", 3000);
			});
};

$scope.deleteUser = function (userId) {
	console.log("deleteUser invoked ",userId);
	if(confirm("ARE YOU SURE YOU WANT TO DELET THIS USER?")){
		userService.deleteUser(userId).then(function(response){
			Materialize.toast("User Deleted", 3000);
			// Materialize.toast("Refresh page to view change", 3000);
      userService.getUsers().then(function(response){
        console.log("allUsers ", response);
        $scope.allUsers = response;
      }, function(error){
        console.log(error);
      });
			$scope.closeThisModal('updateUserModal');
		}, function(error){
			Materialize.toast("Error occured while deleting user.", 3000);
		});
	}
};

  ///////////////////////////
  //   CONTENT CONTROL     //
  ///////////////////////////
  $scope.newAbout = {};

  $scope.getAboutUs = function() {
    contentService.get('about')
    .success(function(response) {
      $scope.aboutUs = response;
      $scope.newAbout.title = response.title;
      $scope.newAbout.body = response.body;
    })
    .error(function(error) {
      console.log(error);
    });
  };

  $scope.updateAboutUs = function(newAbout) {
    var amendedBody = newAbout.body.replace("↵", "\n");
    console.log(amendedBody);
    contentService.update('about', newAbout.title, amendedBody)
      .success(function(response) {
        $scope.aboutUs = response;
        Materialize.toast("Your text has been updated", 3000);
        Materialize.toast("Refresh page to view changes", 3000);
  			$scope.closeThisModal('aboutUsModal');
      })
      .error(function(error) {
  			Materialize.toast("Error occured while creating text.", 3000);
  		});
  };

  /////////////////////////////////////////////
  //    MISSION STATEMENT                    //
  //    THIS FEATURE IS BEING CUT FOR NOW    //
  /////////////////////////////////////////////
  $scope.getMission = function() {
    contentService.get('mission')
    .success(function(response) {
      $scope.mission = response;
    })
    .error(function(error) {
      console.log(error);
    });
  };

  $scope.updateMission = function(title, body) {
    contentService.update('mission', title, body)
      .success(function(response) {
        $scope.mission = response;
        Materialize.toast("Your text has been updated", 3000);
        Materialize.toast("Refresh page to view changes", 3000);
  			$scope.closeThisModal('missionModal');
      })
      .error(function(error) {
  			Materialize.toast("Error occured while creating text.", 3000);
  		});
  };

////////////////////////////
//   PAGE INTERACTIONS    //
////////////////////////////
	(function($) {
	  $(function() {
	    $('.parallax').parallax();
	  }); // end of document ready
	})(jQuery); // end of jQuery name space

  $scope.openToast = function($event) {
    $mdToast.show(
      $mdToast.simple()
        .content('Email Sent')
        .hideDelay(3000)
    );
  };

	$scope.reloadPage = function () {
		location.reload();
	};

  $scope.openThisModal = function (modalName) {
    var openModalName = "#" + modalName;
    console.log('openThisModal, ', openModalName);
    $(openModalName).openModal();
	};

  $scope.closeThisModal = function(modalName){
    var closeModalName = "#" + modalName;
    console.log('closeThisModal, ', closeModalName);
    $('body').removeClass('lean-overlay');
    $('.lean-overlay').remove();
    $(closeModalName).closeModal();
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
