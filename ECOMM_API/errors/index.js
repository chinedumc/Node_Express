const CustomAPIError = require("./custom-api");
const BadRequestError = require("./bad-request");
const NotFoundError = require("./not-found");
const UnauthenticatedError = require("./unauthenticated");
const UnauthorizedError = require("./unauthenticated");

module.exports = {
	BadRequestError,
	CustomAPIError,
	NotFoundError,
	UnauthenticatedError,
	UnauthorizedError,

};
