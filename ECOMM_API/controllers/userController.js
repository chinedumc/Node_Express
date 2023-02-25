// getAllUsers, getSingleUser, ShowCurentUser, updateUser, updateUserPassword

const getAllUsers = async (req, res) => {
	res.send("get all users route");
};
const getSingleUser = async (req, res) => {
	res.send("get Single user route");
};
const ShowCurentUser = async (req, res) => {
	res.send("show current user route");
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
