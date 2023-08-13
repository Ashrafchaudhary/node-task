const { checkLogin, getLoggedInUser, logUserOut } = require("../model/adminModel");

const login = async (req, res) => {
  try {
    const response = {
      status: false,
    };

    const isAdmin = await checkLogin(req.body);

    if (isAdmin.length === 0) {
      response.message = "Admin not found";
    } else {
      const loggedInUser = await getLoggedInUser();

      response.status = true;
      response.data = loggedInUser;
    }

    res.send(response);
  } catch (error) {
    res.send(error);
  }
};

const logoutUser = async (req, res) => {
  try {
    const response = {
      status: false,
    };

    await logUserOut(req.params.id);

    response.status = true;

    res.send(response);
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  login,
  logoutUser,
};
