const jwt = require("jsonwebtoken");
const {UnathenticatedError} = require("../errors");

const authenticationMiddleware = async (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		throw new UnathenticatedError("Invalid login credentials token");
	}

	const token = authHeader.split(" ")[1];

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const { id, username } = decoded;
		req.user = { id, username };

		next();
	} catch (error) {
		throw new UnathenticatedError("Not authorized");
	}
};

module.exports = authenticationMiddleware;
