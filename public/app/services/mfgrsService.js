angular.module('Insight').service('mfgrsService', function($http) {
	this.getS3SignedURL = function(file_name) {
		return $http({
			method: 'GET',
			url: '/s3_signed_url?file_name=' + file_name
		});
	};

	this.addManu = function(title, price, image, description, category) {
		return $http({
			method: 'POST',
			url: '/',
			data: {
				title: title,
        website: website,
        imageURL: imageURL
			}
		});
	};

	// this.getManuInfo = function(){
	// 	return $http({
	// 		method: 'GET',
	// 		url: '/info'
	// 	});
	// };

	this.updateManuInfo = function(id, title, description, price, category) {
		return $http({
			method: 'PUT',
			url: '/info/' + id,
			data: {
				title: title,
				description: description,
				price: price,
				category: category
			}
		});
	};

	this.removeManuInfo = function(id) {
		return $http({
			method: 'DELETE',
			url: '/info/' + id
		});
	};

});
