
const contactModel = require('../models/contacts');
const userModel = require('../models/users');
module.exports = {
	getById: (req, res, next) => {
		console.log(req.body);
		contactModel.findById(req.params.contactId, (err, contactInfo) => {
			if (err) {
				next(err);
			} else {
				res.json({ status: "success", message: "contact found!!!", data: { contacts: contactInfo } });
			}
		});
	},

	getAll: (req, res, next) => {
		try {
			var pageNo = parseInt(req.query.pageNo);
			var size = parseInt(req.query.size);
			var query = {}
			if (pageNo < 0 || pageNo === 0) {
				response = { "error": true, "message": "invalid page number, should start with 1" };
				return res.json(response);
			}
			query.skip = size * (pageNo - 1);
			query.limit = size;

			contactModel.find({}, {}, query, (err, data) => {
				if (err) {
					response = { "error": true, "message": "Error fetching data" };
				} else {
					response = { "error": false, "message": data };
				}
				res.json(response);

			});
		} catch (err) {
			next(err);
		}
	},

	updateById: (req, res, next) => {
		contactModel.findByIdAndUpdate(req.params.contactId, { name: req.body.name }, (err, contactInfo) => {

			if (err)
				next(err);
			else {
				res.json({ status: "success", message: "contact updated successfully!!!", data: null });
			}
		});
	},

	deleteById: (req, res, next) => {
		contactModel.findByIdAndRemove(req.params.contactId, (err, contactInfo) => {
			if (err)
				next(err);
			else {
				res.json({ status: "success", message: "contact deleted successfully!!!", data: null });
			}
		});
	},
	create: async (req, res) => {

		const { name, phone, id } = req.body;
		const contact = await contactModel.create({
			name,
			phone,
			user: id
		});
		await contact.save();

		const userById = await userModel.findById(id);

		userById.contacts.push(contact);
		await userById.save();

		return res.send(userById);
	},
	userByContact: async (req, res) => {
		const { id } = req.params;
		const userByContact = await contactModel.findById(id).populate('user');
		res.send(userByContact);
	}
}					