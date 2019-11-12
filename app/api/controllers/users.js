const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
	create: (req, res, next) => {
		userModel.find({ email: req.body.email }, function (err, data) {
			console.log(data)
			if (data.length) {
				var error = new Error('User already exists!');
				error.status = 401;
				return next(error);
			} else {
				userModel.create({ name: req.body.name, email: req.body.email, password: req.body.password }, (err, result) => {
					if (err)
						next(err);
					else
						res.json({ status: "success", message: "User added successfully!!!", data: null });

				});
			}
		});
	},

	authenticate: (req, res, next) => {
		userModel.findOne({ email: req.body.email }, (err, userInfo) => {
			if (err) {
				next(err);
			} else {

				if (userInfo != null && bcrypt.compareSync(req.body.password, userInfo.password)) {

					const token = jwt.sign({ id: userInfo._id }, req.app.get('secretKey'), { expiresIn: '1h' });

					res.json({ status: "success", message: "user found!!!", data: { user: userInfo, token: token } });

				} else {

					res.json({ status: "error", message: "Invalid email/password!!!", data: null });

				}
			}
		});
	},
	contactsByUser: async (req, res) => {
		const { id } = req.params;
		const user = await userModel.findById(id).populate('contacts');

		res.send(user.contacts);
	}
}					
