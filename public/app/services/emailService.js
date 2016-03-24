angular.module('Insight').service('emailService', function($http) {
	this.sendEmail = function(contactName, fromEmail, messageSub, message) {
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
							'email': 'admin@insightfoodsales.com',
							'name': 'Website Email',
							'type': 'to'
						}
					],
					'html': contactName + '<p>' + message + '</p> <br> <p>Reply to: <strong>' + fromEmail + '</strong></p>'
				}
			}
		});
	};

	this.confirmEmail = function(contactName, fromEmail, messageSub, message) {
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
					'html': '<b><i><p style="font-size:1.3em;">' + contactName + ', </p><p style="font-size:1.3em;">Thank you for taking the time to reach out to us.  We have received your message and will be in touch with you.</p></i></b><br><strong><i><p style="font-size:1.8em; color:#1a237e;">Insight Food Sales</p></i></strong><br><p style="font-size:1.1em;">1938 N. Batavia St., Suite K</p><p style="font-size:1.1em">Orange, CA 92865</p><p style="font-size:1.1em;">Tel: (714)685-9323</p><p style="font-size:1.1em;">Fax: (714)685-9773</p><br>'
				}
			}
		});
	};
});
