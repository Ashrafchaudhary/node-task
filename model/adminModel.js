const executeQuery = require("../helper/dbConnection");

const checkLogin = async (request) => {
  const sql = "select * from admin where email_id = ? and password = ?";

  const result = await executeQuery(sql, [request.email_id, request.password]);

  return result;
};

const getLoggedInUser = async () => {
  const sql =
    "SELECT u.id, u.username, u.email_id FROM user_log AS ul LEFT JOIN users AS u ON u.id = ul.user_id";

  const result = await executeQuery(sql);

  return result;
};

const logUserOut = async (id) => {
  const sql = "DELETE from user_log where user_id = ?";

  const result = await executeQuery(sql, id);

  return result;
};

module.exports = {
  checkLogin,
  getLoggedInUser,
  logUserOut,
};
