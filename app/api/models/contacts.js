const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
	name: {
		type: String,
		trim: true,
		required: true,
	},
	phone: {
		type: String,
		trim: true,
		required: true
	},
	user: { type: Schema.Types.ObjectId, ref: 'User' }
},
	{
		timestamps: true
	});

module.exports = mongoose.model('Contact', ContactSchema)