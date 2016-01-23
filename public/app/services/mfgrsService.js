angular.module('Insight').service('mfgrsService', function($http) {
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
