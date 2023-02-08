const register = async (req, res) => {
	res.send("register user");
};

const login = async (req, res) => {
	res.send("user login");
};

module.exports = {register, login}
