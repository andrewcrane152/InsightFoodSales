angular.module('Insight');
app.service('textFieldService', function($http, $q){

////////////////////
//    ABOUT US    //
////////////////////
	this.createAboutUs = function(aboutUsTitle, aboutUs){
		return $http({
			method: 'POST',
			url: '/aboutus',
			data: {
				aboutUsTitle: aboutUsTitle,
				aboutUs: aboutUs,
			}
		});
	};

	this.updateAboutUs = function(aboutUsTitle, aboutUs, aboutUsId){
		console.log('update about us invoked ');
		return $http({
			method: 'PUT',
			url: '/aboutus/' + aboutUsId,
			data: {
				aboutUsTitle: aboutUsTitle,
				aboutUs: aboutUs,
			}
		});
	};

	this.getAboutUs = function(){
		return $http({
			method: 'GET',
			url: '/aboutus',
		});
	};

///////////////////
//    MISSION    //
///////////////////
	this.createMission = function(missionStatementTitle, missionStatement){
		return $http({
			method: 'POST',
			url: '/mission',
			data: {
				missionStatementTitle: missionStatementTitle,
				missionStatement: missionStatement,
			}
		});
	};

	this.updateMission = function(missionStatementTitle, missionStatement, missionId){
		console.log('update user invoked ');
		return $http({
			method: 'PUT',
			url: '/mission/' + missionId,
			data: {
        missionStatementTitle: missionStatementTitle,
				missionStatement: missionStatement,
			}
		});
	};

	this.getMission = function(){
		return $http({
			method: 'GET',
			url: '/mission',
		});
	};

});
