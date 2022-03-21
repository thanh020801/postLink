const dotenv = require('dotenv')
dotenv.config()

module.exports = {
	port: process.env.PORT || 5000,
	salt: process.env.SALT,
	DB: {
		uri: process.env.MONGOO_URI,
	},
}