const {
  addUser,
  addUserInLog,
  findIfUserExists,
  getUserData,
  checkTokenInDatabase,
} = require("../model/loginModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const verifytoken = async (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    const tokenResult = await checkTokenInDatabase(token);
    if (tokenResult.length > 0) {
      req.token = token;
      next();
    } else {
      res.send("Logged out by Admin");
    }
  } else {
    res.send("Token not valid");
  }
};

const registerUser = async (req, res) => {
  try {
    const response = {
      status: false,
    };

    const userExists = await findIfUserExists(req.body);

    if (userExists.length > 0) {
      response.message = "User already exists";
    } else {
      const hashedPass = await bcrypt.hash(req.body.password, 10);

      await addUser(req.body, hashedPass);

      response.status = true;
      response.message = "User created successfully";
    }

    res.send(response);
  } catch (error) {
    res.send(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const response = {
      status: false,
    };

    const userExists = await findIfUserExists(req.body);

    if (userExists.length === 0) {
      response.message = "User not found";
    } else {
      const matchPassword = await bcrypt.compare(req.body.password, userExists[0].password);
      if (!matchPassword) {
        response.message = "Invalid credentials";
      } else {
        const token = jwt.sign(
          { email: userExists[0].email_id, id: userExists[0].id },
          process.env.SECRET_KEY
        );

        await addUserInLog(userExists, token);

        response.status = true;
        response.token = token;
      }
    }

    res.send(response);
  } catch (error) {
    res.send(error);
  }
};

const userData = async (req, res) => {
  try {
    const response = {
      status: false,
    };

    const verifyResposne = jwt.verify(req.token, process.env.SECRET_KEY);

    console.log("verifyResposne", verifyResposne);

    if (typeof verifyResposne.id != "undefined") {
      const userData = await getUserData(verifyResposne.id);

      response.status = true;
      response.data = userData[0];
    } else {
      response.message = "Invalid token";
    }

    res.send(response);
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  userData,
  verifytoken,
};
