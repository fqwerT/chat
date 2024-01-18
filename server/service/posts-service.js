const pool = require("../database/db");
const insertQuery = require("../utlis/SQLrequests").insertItems;
const TokenService = require("./token-service");

class UserPosts {
  static async GetPosts(access) {
    try {
      if (access) {
        const checkToken = await TokenService.validationAccessToken(access);
        const result = await pool.query("SELECT * FROM users_post");
        return result;
      } else return new Error();
    } catch (e) {
      return e;
    }
  }

  static async newPost(access, value, id, name) {
    try {
      if (access) {
        const checkToken = await TokenService.validationAccessToken(access);
        const insert = `INSERT INTO users_post (content, user_id, user_name) VALUES($1, $2, $3) RETURNING *`;
       // const result = await pool.query(insert, [value, id, name]);
       console.log(insert)
        return result;
      } else return new Error();
    } catch (e) {
      return e;
    }
  }
}

module.exports = UserPosts;
