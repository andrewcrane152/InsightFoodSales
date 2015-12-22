angular.module('Insight')
.controller('infoCtrl', function($scope, $mdToast, infoService, photos){

	$scope.manuInfo = manuInfo;
	$scope.photos = photos;
	
	$scope.productOptions = [] 
	for(var i = 0; i < $scope.manuInfo.length; i++){
		if($scope.manuInfo[i].category === 'product'){
			$scope.productOptions.push($scope.manuInfo[i])
		}
	}

	$scope.showImageDetails = function(image){
		image.show = !image.show
	}
	
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




	$scope.getManuInfo = function(){
		infoService.getManuInfo().then(function(response){
			$scope.manuInfo = response.data;
		})
	}

	

	$scope.addProduct = function(imageSrc, file, manuName, manuWebsite, manuImage){
		$scope.file = file;
		infoService.uploadPhoto(imageSrc, $scope.file).then(function(response){
			var url = response.data.Location;
			infoService.addProduct(url, manuName, manuWebsite, manuImage).then(function(response){
				$scope.newManuName = '';
				$scope.newManuWebsite = '';
				$scope.newManuImage = '';
				$scope.imageSrc = null;
				$scope.getManuInfo();
				Materialize.toast("product added.  you may need to refresh the page", 1000)
			})
		}, function(err){
			Materialize.toast('product was not added', 1000)
		})
	}

	$scope.updateProduct = function(id, manuName, manuWebsite, manuImage){
		if(confirm("Are you sure you want to update this info?")){
			infoService.updateProduct(id, title, description, price, category).then(function(response){
				alert('This product has been updated.')
				$scope.getManuInfo();
			})
		}
	}

	$scope.removeProduct = function(id){
		if(confirm("Are you sure you want to delete this product?")){
			infoService.removeProduct(id).then(function(response){
				$scope.getManuInfo();
				Materialize.toast("product deleted", 1000)
			}, function(err){
				Materialize.toast("something went wrong", 1000)
			})
		}
	}


	$scope.getPhotos = function(){
		infoService.getPhotos().then(function(response){
			$scope.photos = response.data;
		}, function(err){
			Materialize.toast("couldn't retrieve photos", 1000)
		})
	}

	

	$scope.addPhoto = function(imageSrc, file, manuName, manuWebsite){
		$scope.file = file;
		infoService.uploadPhoto(imageSrc, $scope.file).then(function(response){
			var url = response.data.Location;
			infoService.addPhoto(manuName, manuWebsite).then(function(response){
				$scope.manuName = '';
				$scope.manuWebsite = '';
				$scope.manuImage = '';
				$scope.imageSrc = null;
				$scope.getPhotos();
				Materialize.toast("photo added", 1000)
			}, function(err){
				Materialize.toast("photo was not added", 1000)
			})
		})
	}


				

	$scope.updatePhoto = function(id, manuName, manuWebsite, manuImage){
		if(confirm("Are you sure you want to update this image's info?")){
			infoService.updatePhoto(id, manuName, manuWebsite, manuImage).then(function(response){
				Materialize.toast('This image has been updated', 1000)
				$scope.getPhotos();
			}, function(err){
				Materialize.toast("photo not updated", 1000)
			})
		}
	}

	$scope.removePhoto = function(id){
		if(confirm("Are you sure you want to delete this image?")){
			infoService.removePhoto(id).then(function(response){
				$scope.getPhotos();
				Materialize.toast('photo deleted', 1000)
			}, function(err){
				Materialize.toast('photo not deleted', 1000)
			})
		}
	}

});