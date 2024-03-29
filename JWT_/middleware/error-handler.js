const {CustomAPIError} = require("../errors");
const {StatusCodes}=require('http-status-codes')
const errorHandlerMiddlerware = async (err, req, res, next) => {
	// console.log(err);
	if (err instanceof CustomAPIError) {
		return res.status(err.statusCode).json({ msg: err.message });
	}
	return res
		.status(StatusCodes.INTERNAL_SERVER_ERROR)
		.json({ msg: "Something went wrong, please try again" });
};

module.exports = errorHandlerMiddlerware;
