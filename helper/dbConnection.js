const mysql = require("serverless-mysql");

const database = mysql({
  config: {
    host: "localhost",
    port: 3306,
    database: "node",
    user: "root",
    password: "Admin1234",
    timezone: "IST",
  },
});

function executeQuery(query, values = []) {
  return new Promise((resolve, reject) => {
    try {
      database.query(query, values).then((results) => {
        database.end();
        resolve(JSON.parse(JSON.stringify(results)));
      });
    } catch (error) {
      resolve([]);
    }
  });
}

module.exports = executeQuery;
