const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

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
	res.status(StatusCodes.OK).json({ user });
};
const ShowCurentUser = async (req, res) => {
	res.status(StatusCodes.OK).json({ user: req.user });
};
const updateUser = async (req, res) => {
	res.send("update user route");
};
const updateUserPassword = async (req, res) => {
	res.send("update user password");
};

module.exports = {
	getAllUsers,
	getSingleUser,
	ShowCurentUser,
	updateUser,
	updateUserPassword,
};
