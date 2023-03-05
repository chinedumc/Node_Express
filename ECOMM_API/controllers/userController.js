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
	const { oldPassword, newPassword } = req.body;
	if (!oldPassword || !newPassword) {
		throw new CustomError.BadRequestError(
			"Please proveide old and new password"
		);
	}

	const user = await User.findOne({ _id: req.user.userId })

  const isPasswordCorrect=await user.comparePasswords(oldPassword)
  if(!isPasswordCorrect){
    throw new CustomError.UnauthenticatedError('Invalid Credentials')
  }
  user.password=newPassword

  await user.save()
  res.status(StatusCodes.OK).json({msg:'Sucess! Password updated'})
};

module.exports = {
	getAllUsers,
	getSingleUser,
	ShowCurentUser,
	updateUser,
	updateUserPassword,
};