const executeQuery = require("../helper/dbConnection");

const findIfUserExists = async (request) => {
  const sql = "select * from users where email_id = ?";

  const result = await executeQuery(sql, request.email_id);

  return result;
};

const addUser = async (request, password) => {
  const data = {
    username: request.username,
    email_id: request.email_id,
    password: password,
    created_at: new Date(),
  };

  const sql = "insert into users set ?";

  const result = await executeQuery(sql, data);

  return result;
};

const addUserInLog = async (userData, token) => {
  const sql = "select * from user_log where user_id = ?";

  const result = await executeQuery(sql, userData[0].id);

  if (result.length > 0) {
    const sql1 = "update user_log set token = ? where user_id = ?";

    await executeQuery(sql1, [token, userData[0].id]);
  } else {
    const data = {
      user_id: userData[0].id,
      token: token,
      is_logged_in: 1,
    };

    const sql2 = "insert into user_log set ?";

    await executeQuery(sql2, data);
  }

  return true;
};

const getUserData = async (id) => {
  const sql = "select id, username, email_id from users where id = ?";

  const result = await executeQuery(sql, id);

  return result;
};

const checkTokenInDatabase = async (token) => {
  const sql = "select * from user_log where token = ?";

  const result = await executeQuery(sql, token);

  return result;
};

module.exports = {
  findIfUserExists,
  addUser,
  addUserInLog,
  checkTokenInDatabase,
  getUserData,
};
