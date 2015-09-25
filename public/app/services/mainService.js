angular.module('Insight');
app.service('mainService', function($http){

	this.sendEmail = function(contactName, fromEmail, messageSub, message){
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

	this.confirmEmail = function(contactName, fromEmail, messageSub, message){
		return $http({
			method: "POST",
			url: "https://mandrillapp.com/api/1.0/messages/send.json",
			data: {
				'key': 'K7f6Hj_JxDwqKqYkbiyvcQ',
				'message': {
					'subject': messageSub,
					'from_email': 'admin@insightfoodsales.com',
					'to': [{
							'email': fromEmail,
							'name': contactName,
							'type': 'to'
						}],
					'subject': 'Thank you from Insight Food Sales',
					'html': contactName + ', <p>Thank you for taking the time to reach out to us.  We have received your message and will be in touch with you.</p><br><br> <strong><p>Insight Food Sales</p><p>(714)685-9323</p></strong> <br><br> <p>Below is a copy of your message</p><p>Subject:' + messageSub + '</p><p>' + message + '</p>'
				}
			}
		});
	};

});