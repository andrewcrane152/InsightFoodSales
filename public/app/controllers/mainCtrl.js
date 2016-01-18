angular.module('Insight')
.controller('mainCtrl', function($scope, $mdToast, $http, emailService, mfgrsService, userService){

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
	userService.adminLogin(loginEmail, loginPassword).then(function(response){
		$('#loginModal').closeModal();
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
			$('#addUserModal').closeModal();
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
				$('#updateUserModal').closeModal();
			})
		.error(function(error){
				Materialize.toast("Error occured while updating user.", 3000);
			});
};

$scope.deleteUser = function (selectedUser) {
	console.log(selectedUser);
	// if(confirm("Are you sure you want to delete {{}}")){
	// 	userService.deleteUser(userId).then(function(response){
	// 		Materialize.toast("User Deleted", 3000);
	// 		$('#addUserModal').closeModal();
	// 	}, function(error){
	// 		Materialize.toast("Error occured while adding user.", 3000);
	// 	});
	// }
};

/////////////////////////////
//    TEXTFIELD CONTROL    //
/////////////////////////////

//    ABOUT US
$scope.createAboutUs = function() {
  textFieldService.createAboutUs(aboutUsTitle, aboutUs)
    .success(function(response){
        console.log(response);
        $scope.aboutUs = response;
        Materialize.toast("New textfield created", 3000);
  			$('#aboutUsModal').closeModal();
      })
    .error(function(error){
				Materialize.toast("Error occured while creating text.", 3000);
			});
};

$scope.updateAboutUs = function() {
  var aboutUsId = $scope.aboutUs._id;
  textFieldService.updateAboutUs(aboutUsTitle, aboutUs, aboutUsId)
    .success(function(response){
        console.log(response);
        $scope.textFields = response;
        Materialize.toast("Your text has been updated", 3000);
        Materialize.toast("Refresh page to view changes", 3000);
  			$('#aboutUsModal').closeModal();
      })
    .error(function(error){
				Materialize.toast("Error occured while creating text.", 3000);
			});
};

//    MISSION STATEMENT
$scope.createMission = function() {
  textFieldService.createMission(missionStatementTitle, missionStatement)
    .success(function(response){
        console.log(response);
        $scope.mission = response;
        Materialize.toast("New textfield created", 3000);
  			$('#missionModal').closeModal();
      })
    .error(function(error){
				Materialize.toast("Error occured while creating text.", 3000);
			});
};

$scope.updateMission = function() {
  var missionId = $scope.mission._id;
  textFieldService.updateMission(missionStatementTitle, missionStatement, missionId)
    .success(function(response){
        console.log(response);
        $scope.textFields = response;
        Materialize.toast("Your text has been updated", 3000);
        Materialize.toast("Refresh page to view changes", 3000);
  			$('#missionModal').closeModal();
      })
    .error(function(error){
				Materialize.toast("Error occured while creating text.", 3000);
			});
};
/////////////////////////////
//    PAGE INTERACTIONS    //
/////////////////////////////

	(function($){
	  $(function(){
	    $('.button-collapse').sideNav();
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

  $scope.closeMenuBar = function () {
    console.log('closeMenuBar invoked');
    $('#mobile-demo').sideNav('hide');
  };

	$scope.openloginModal = function () {
		$('#loginModal').openModal();
	};

	$scope.openAddUserModal = function () {
		console.log('openAddUserModal invoked');
		$('#addUserModal').openModal();
	};

	$scope.openUpdateUserModal = function () {
		$('#updateUserModal').openModal();
	};

	$scope.openEditManuModal = function () {
		$('#editModal').openModal();
	};

	$scope.openCreateManuModal = function () {
		$('#uploadModal').openModal();
	};

  $scope.changeSelection = function(val){
  	console.log(val);
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
