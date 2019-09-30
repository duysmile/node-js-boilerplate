const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	auth: {
		type: 'login', // default
		user: 'example@gmail.com',
		pass: 'key_gmail_for_app',
	},
});

exports.sendMail = (receiveEmail, type, data) => new Promise((resolve, reject) => {
	const mailOptions = {
		from: 'example@mail.com',
	};
	if (type === 'FORGOT_PASSWORD') {
		mailOptions.to = receiveEmail;
		mailOptions.subject = 'Change password';
		// Load template html email here
		mailOptions.html = `Token to reset passowrd: ${data.token}`;
	}
	transporter.sendMail(mailOptions, (err, info) => {
		if (err) {
			return reject(err);
		}
		return resolve(info);
	});
});
