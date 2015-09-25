angular.module('Insight');
app.service('mainService', function($http){

	this.sendEmail = function(contactName, fromEmail, messageSub, message){
		console.log(contactName, fromEmail, messageSub, message);
		return $http({
			method: "POST",
			url: "https://mandrillapp.com/api/1.0/messages/send.json",
			data: {
				'key': 'K7f6Hj_JxDwqKqYkbiyvcQ',
				'message': {
					'subject': messageSub,
					'from_email': fromEmail,
					'to': [
						{
							'email': 'cranium152@gmail.com',
							'name': 'Website Email',
							'type': 'to'
						}
					],
					'html': contactName + '<p>' + message + '</p> <br> <p>Reply to: <strong>' + fromEmail + '</strong></p>'
				}
			}
		});
	};

});