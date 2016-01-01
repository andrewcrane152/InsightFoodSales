angular.module('Insight');
app.service('infoService', function($http){

	this.addManuInfo = function(title, price, image, description, category){
		return $http({
			method: 'POST',
			url: '/info',
			data: {
				title: title,
				price: price,
				image: image,
				description: description,
				category: category
			}
		})
	}

	this.getManuInfo = function(){
		return $http({
			method: 'GET',
			url: '/info'
		})
	}

	this.updateManuInfo = function(id, title, description, price, category){
		return $http({
			method: 'PUT',
			url: '/info?id=' + id,
			data: {

				title: title,
				description: description,
				price: price,
				category: category
			}
		})
	}

	this.removeManuInfo = function(id){
		return $http({
			method: 'DELETE',
			url: '/info?id=' + id
		})
	}




	this.uploadPhoto = function(imageSrc, file){
	 
		return $http({
			method: 'POST',
			url: '/upload',
			data: {
				image: imageSrc,
				file: {
					name: file.name,
					type: file.type
				}
			}
		})
	}


	this.addPhoto = function(title, website, image){

		return $http({
			method: 'POST',
			url: '/admin/photos',
			data: {
				title: title,
				website: website,
				image: image
			}
		})
	}



	this.getPhotos = function(){
		return $http({
			method: 'GET',
			url: '/admin/photos'
		})
	}

	this.updatePhoto = function(title, website, image){
		return $http({
			method: 'PUT',
			url: '/admin/photos?id=' + id,
			data: {

				title: title,
				website: website,
				image: image 
			}
		})
	}

	this.removePhoto = function(id){
		return $http({
			method: 'DELETE',
			url:'/admin/photos?id=' + id
		})
	}	

});