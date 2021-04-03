module.exports = function (length){
	// Importing some libraries
	const randomstring = require("randomstring");
	return randomstring.generate({length: length, charset: "alphabetic"});
}
