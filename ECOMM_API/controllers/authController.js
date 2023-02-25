// const mongoose = require("mongoose");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { attachCookiesToResponse } = require("../utils");

const register = async (req, res) => {
	const { email, name, password } = req.body;
	const emailAlreadyExists = await User.findOne({ email });
	if (emailAlreadyExists) {
		throw new CustomError.BadRequestError("Email already exists");
	}

	// first registered user is an admin
	const isFirstAccount = (await User.countDocuments({})) === 0;
	const role = isFirstAccount ? "admin" : "user";

	const user = await User.create({ name, email, password, role });
	const tokenUser = { name: user.name, userId: user._id, role: user.role };
	// const token = jwt.sign(tokenUser, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME });
	// const token = createJWT({ payload: tokenUser }); //Not needed

	// const oneDay = 1000 * 60 * 60 * 24;

	// res.cookie("token", token, {
	// 	httpOnly: true,
	// 	expires: new Date(Date.now() + oneDay),
	// });

	attachCookiesToResponse({ res, user: tokenUser });
	res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const login = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		throw new CustomError.BadRequestError("Please provide email and password");
	}

	const user = await User.findOne({ email });
	if (!user) {
		throw new CustomError.UnauthenticatedError("Invalid credentials");
	}

	const isPasswordCorrect = await user.comparePasswords(password);
	if (!isPasswordCorrect) {
		throw new CustomError.UnauthenticatedError("Invalid credentials");
	}

	const tokenUser = { name: user.name, userId: user._id, role: user.role };
	attachCookiesToResponse({ res, user: tokenUser });
	res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const logout = async (req, res) => {
	res.send("logout");
};

module.exports = { register, login, logout };
