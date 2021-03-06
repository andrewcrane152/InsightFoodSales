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
		$scope.user = response.data;
    $scope.closeThisModal('loginModal');
    userService.getUsers().then(function(response){
      $scope.allUsers = response;
    }, function(_error){
      console.log('Unable to retrieve users.');
    });
	}, function(error){
		Materialize.toast("Log In Failed", 3000);
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
        $scope.allUsers = response;
      }, function(_error){
        console.log('Unable to retrieve users.');
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
	if(confirm("ARE YOU SURE YOU WANT TO DELET THIS USER?")){
		userService.deleteUser(userId).then(function(response){
			Materialize.toast("User Deleted", 3000);
			// Materialize.toast("Refresh page to view change", 3000);
      userService.getUsers().then(function(response){
        $scope.allUsers = response;
      }, function(_error){
        console.log('Unable to retrieve users.');
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
    .error(function(_error) {
      console.log('Unable to retrieve about section content.');
    });
  };

  $scope.updateAboutUs = function(newAbout) {
    var amendedBody = newAbout.body.replace("↵", "\n");
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
      console.log('Unable to retrieve mission section content.');
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
    $(openModalName).openModal();
	};

  $scope.closeThisModal = function(modalName){
    var closeModalName = "#" + modalName;
    $(closeModalName).closeModal();
  };


  // MANUFACTURERS

  $scope.getMfgrs = function() {
    mfgrsService.getAll()
    .success(function(response) {
      $scope.mfgrs = response;
    })
    .error(function(error) {
      console.log('Unable to retrieve manufacturers.');
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


  // EDIT MANUFACTURERS
  $scope.adjustedMfgr = null;

  $scope.openEditManuModal = function(mfgr) {
    $scope.adjustedMfgr = mfgr;
    $('#editManuModal').openModal();
  };

  $scope.updateMfgr = function() {
    if (!$scope.adjustedMfgr) return null;
    mfgrsService.update($scope.adjustedMfgr)
    .success(function(response) {
      $scope.adjustedMfgr = null;
      $scope.getMfgrs();
      Materialize.toast("The manfacturer has been updated", 3000);
      $scope.closeThisModal('editManuModal');
    })
    .error(function(error) {
      Materialize.toast("Error occured while updating manfacturer.", 3000);
    });
  };

  // S3 Image Upload
  function edit_upload_file(file, signed_request, url) {
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", signed_request);
    xhr.setRequestHeader('x-amz-acl', 'public-read');
    xhr.onload = function() {
      if (xhr.status === 200) {
        document.getElementById("editPreview").src = url;
        $scope.adjustedMfgr.imageURL = url;
      }
    };
    xhr.onerror = function() { alert("Could not upload file."); };
    xhr.send(file);
  }

  function edit_get_signed_request(file) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/s3_signed_url?file_name="+file.name+"&file_type="+file.type);
    xhr.onreadystatechange = function(){
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var response = JSON.parse(xhr.responseText);
          edit_upload_file(file, response.signed_request, response.url);
        }
        else alert("Could not get signed URL.");
      }
    };
    xhr.send();
  }

  function edit_init_upload() {
    var files = document.getElementById("edit_file_input").files;
    var file = files[0];
    if (file === null) {
      alert("No file selected.");
      return;
    }
    edit_get_signed_request(file);
  }

  (function() {
    document.getElementById("edit_file_input").onchange = edit_init_upload;
  })();

  $scope.removeMfgr = function() {
    if (!$scope.adjustedMfgr) return null;
    mfgrsService.remove($scope.adjustedMfgr._id)
    .success(function(response) {
      $scope.adjustedMfgr = null;
      $scope.getMfgrs();
      Materialize.toast("The manfacturer has been removed", 3000);
      $scope.closeThisModal('editManuModal');
    })
    .error(function(error) {
      Materialize.toast("Error occured while creating text.", 3000);
    });
  };
});
