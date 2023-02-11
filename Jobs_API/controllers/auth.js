const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
	// const { name, email, password } = req.body;

	// const salt = await bcrypt.genSalt(10)
	// const hashedPassword = await bcrypt.hash(password, salt)

	// const tempUser = {name, email, password:hashedPassword}

	const user = await User.create({ ...req.body });

	//MOVED TO THE MODEL
	// const token = jwt.sign({ userId: user._id, name: user.name }, "jwtSecret", {
	// 	expiresIn: "30d",
	// });
	const token = user.createJWT();
	// console.log(user, "useer");
	// console.log(token, "token");
	res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
	const { password, email } = req.body;

	if (!password || !email) {
		throw new BadRequestError("Please enter email and password");
	}
	const user = await User.findOne({ email });

	if (!user) {
		throw new UnauthenticatedError("Invalid credentials");
	}
	const token = user.createJWT();
	res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = { register, login };
