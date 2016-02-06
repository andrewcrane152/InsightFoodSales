angular.module('Insight').service('mfgrsService', function($http) {
	this.getS3SignedURL = function(file_name) {
		return $http({
			method: 'GET',
			url: '/s3_signed_url?file_name=' + file_name
		});
	};

	this.getAll = function() {
		return $http({
			method: 'GET',
			url: '/mfgrs'
		});
	};

	this.create = function(attrs) {
		return $http({
			method: 'POST',
			url: '/mfgrs',
			data: attrs
		});
	};

	this.update = function(attrs) {
		return $http({
			method: 'PUT',
			url: '/mfgrs/' + attrs._id,
			data: {
				title: attrs.title,
				website: attrs.website,
				imageURL: attrs.imageUrl
			}
		});
	};

	this.remove = function(id) {
		return $http({
			method: 'DELETE',
			url: '/mfgrs/' + id
		});
	};

});
