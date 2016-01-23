app.service('contentService', function($http) {
	this.get = function(section) {
		return $http({
			method: 'GET',
			url: '/content/' + section
		});
	};

	this.update = function(section, title, body) {
		return $http({
			method: 'PUT',
			url: '/content/' + section,
			data: { title: title, body: body }
		});
	};
});
