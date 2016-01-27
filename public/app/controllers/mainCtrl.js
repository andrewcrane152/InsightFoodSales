angular.module('Insight')
.controller('mainCtrl', function($scope, $mdToast, $http, emailService,
  mfgrsService, userService, contentService, aboutUs, mission, mfgrs) {
  $scope.triggerTitle = '(select name)';
  $scope.triggerEvent = '';
  $scope.mfgrs = mfgrs.data;
  $scope.aboutUs = aboutUs.data;
  $scope.mission = mission.data;

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
		console.log("user ", response);
		$scope.user = response.data;
	}, function(error){
		Materialize.toast("Log In Failed", 3000);
	});
  $scope.closeThisModal('loginModal');
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
  			$scope.closeThisModal('editAboutUsModal');
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
    $(closeModalName).closeModal();
  };


  // MANUFACTURERS

  $scope.getMfgrs = function() {
    mfgrsService.getAll()
    .success(function(response) {
      $scope.mfgrs = response.data;
    })
    .error(function(error) {
      console.log(error);
    });
  };

  $scope.newMfgr = {};
  $scope.createMfgr = function() {
    mfgrsService.create($scope.newMfgr)
    .success(function(response) {
      $scope.mfgrs.push(response);
      Materialize.toast("The manfacturer has been included", 3000);
      $scope.closeThisModal('uploadManuModal');
    })
    .error(function(error) {
      Materialize.toast("Error occured while creating manfacturer.", 3000);
    });
  };

  $scope.adjustedMfgr = null;
  $scope.updateMfgr = function() {
    if (!adjustedMfgr) return null;
    mfgrsService.update($scope.adjustedMfgr)
    .success(function(response) {
      $scope.adjustedMfgr = null;
      $scope.mfgrs = $scope.getMfgrs();
      Materialize.toast("The manfacturer has been updated", 3000);
      $scope.closeThisModal('editManuModal');
    })
    .error(function(error) {
      $scope.adjustedMfgr = null;
      Materialize.toast("Error occured while updating manfacturer.", 3000);
    });
  };

  $scope.removeMfgr = function(id) {
    if (!adjustedMfgr) return null;
    mfgrsService.remove(id)
    .success(function(response) {
      $scope.adjustedMfgr = null;
      $scope.mfgrs = $scope.getMfgrs();
      Materialize.toast("The manfacturer has been included", 3000);
      $scope.closeThisModal('editAboutUsModal');
    })
    .error(function(error) {
      $scope.adjustedMfgr = null;
      Materialize.toast("Error occured while creating text.", 3000);
    });
  };

  $scope.adjustedMfgr = null;
  // S3 Image Upload
  function upload_file(file, signed_request, url) {
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", signed_request);
    xhr.setRequestHeader('x-amz-acl', 'public-read');
    xhr.onload = function() {
      if (xhr.status === 200) {
        document.getElementById("preview").src = url;
        $scope.newMfgr.imageURL = url;
      }
    };
    xhr.onerror = function() { alert("Could not upload file."); };
    xhr.send(file);
  }

  function get_signed_request(file) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/s3_signed_url?file_name="+file.name+"&file_type="+file.type);
    xhr.onreadystatechange = function(){
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var response = JSON.parse(xhr.responseText);
          upload_file(file, response.signed_request, response.url);
        }
        else alert("Could not get signed URL.");
      }
    };
    xhr.send();
  }

  function init_upload() {
    console.log("here");
    var files = document.getElementById("file_input").files;
    var file = files[0];
    if (file === null) {
      alert("No file selected.");
      return;
    }
    get_signed_request(file);
  }

  (function() {
    document.getElementById("file_input").onchange = init_upload;
  })();
});
