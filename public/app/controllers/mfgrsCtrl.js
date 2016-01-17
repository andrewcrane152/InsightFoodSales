angular.module('Insight')
.controller('mfgrsCtrl', function($scope, $mdToast, $http, emailService, mfgrsService, userService){

	$scope.manuInfo = manuInfo;

	$scope.showImageDetails = function(image){
		image.show = !image.show;
	};

    $scope.getFile = function () {
        $scope.progress = 0;
        fileReader.readAsDataUrl($scope.file, $scope)
          .then(function(result) {
              $scope.imageSrc = result;
          });
    };

    $scope.$on("fileProgress", function(e, progress) {
        $scope.progress = progress.loaded / progress.total;
    });


	$scope.addManu = function(imageSrc, file, manuName, manuWebsite, manuImage){
		$scope.file = file;
		infoService.uploadPhoto(imageSrc, $scope.file).then(function(response){
			var url = response.data.Location;
			infoService.addProduct(url, manuName, manuWebsite, manuImage).then(function(response){
				$scope.newManuName = '';
				$scope.newManuWebsite = '';
				$scope.newManuImage = '';
				$scope.imageSrc = null;
				$scope.getManuInfo();
				Materialize.toast("Manufacturer added.\nYou may need to refresh the page", 3000);
			});
		}, function(err){
			Materialize.toast('product was not added', 3000);
		});
	};

	$scope.getManuInfo = function(){
		infoService.getManuInfo().then(function(response){
			$scope.manuInfo = response.data;
		});
	};

	$scope.updateManu = function(id, manuName, manuWebsite, manuImage){
		if(confirm("Are you sure you want to update this info?")){
			infoService.updateProduct(id, title, description, price, category).then(function(response){
				Materialize.toast('This manufacturer has been updated.');
				$scope.getManuInfo();
			});
		}
	};

	$scope.removeManu = function(id){
		if(confirm("Are you sure you want to delete this product?")){
			infoService.removeProduct(id).then(function(response){
				$scope.getManuInfo();
				Materialize.toast("Manufacturer successfully deleted");
			}, function(err){
				Materialize.toast("something went wrong", 3000);
			});
		}
	};

});
