const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { createTokenUser, attachCookiesToResponse,checkPermissions } = require("../utils");

// getAllUsers, getSingleUser, ShowCurentUser, updateUser, updateUserPassword

const getAllUsers = async (req, res) => {
	const users = await User.find({ role: "user" }).select("-password");
	res.status(StatusCodes.OK).json({ users });
};
const getSingleUser = async (req, res) => {
	const user = await User.findOne({ _id: req.params.id }).select("-password");
	if (!user) {
		throw new CustomError.NotFoundError(
			`No user found with id: ${req.params.id}`
		);
	}
	checkPermissions(req.user, user._id)
	res.status(StatusCodes.OK).json({ user });
};
const ShowCurentUser = async (req, res) => {
	res.status(StatusCodes.OK).json({ user: req.user });
};

// Update user with user.save()
const updateUser = async (req, res) => {
	const { name, email } = req.body;

	if (!name || !email) {
		throw new CustomError.BadRequestError(
			"Please enter valid email and password"
		);
	}
	const user = await User.findOne({ _id: req.user.userId });

	user.email = email;
	user.name = name;

	await user.save();

	const tokenUser = createTokenUser(user);
	attachCookiesToResponse({ res, user: tokenUser });
	res.status(StatusCodes.OK).json({ user: tokenUser });
};
const updateUserPassword = async (req, res) => {
	const { oldPassword, newPassword } = req.body;
	if (!oldPassword || !newPassword) {
		throw new CustomError.BadRequestError(
			"Please proveide old and new password"
		);
	}

	const user = await User.findOne({ _id: req.user.userId });

	const isPasswordCorrect = await user.comparePasswords(oldPassword);
	if (!isPasswordCorrect) {
		throw new CustomError.UnauthenticatedError("Invalid Credentials");
	}
	user.password = newPassword;

	await user.save();
	res.status(StatusCodes.OK).json({ msg: "Sucess! Password updated" });
};

module.exports = {
	getAllUsers,
	getSingleUser,
	ShowCurentUser,
	updateUser,
	updateUserPassword,
};

// Update user with findOneAndUpdate
// const updateUser = async (req, res) => {
// 	const { name, email } = req.body;

// 	if (!name || !email) {
// 		throw new CustomError.BadRequestError(
// 			"Please enter valid email and password"
// 		);
// 	}

// 	// const user = createTokenUser(user)
// 	const user = await User.findOneAndUpdate(
// 		{ _id: req.user.userId },
// 		{ name, email },
// 		{ new: true, runValidators: true }
// 	);
// 	const tokenUser = createTokenUser(user);
// 	attachCookiesToResponse({ res, user: tokenUser });
// 	res.status(StatusCodes.OK).json({ user: tokenUser });
// };
