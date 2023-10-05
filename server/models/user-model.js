const db = require("../database/db.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const insertItems = require("./../utlis/SQLrequests.js");

const secret = "zasdfasfasdax";

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const query = insertItems("users_list", email, password, name);
  try {
    const result = await db.query("SELECT * FROM users_list WHERE email = $1", [
      email,
    ]);
    const userAlreadyExist = result.rows.find((user) => user.email === email);

    if (userAlreadyExist) {
      return res
        .status(400)
        .json(`user with email ${email} has been already registered`);
    }

    const { rows } = await db.query(query, [email, password, name]);

    const payload = {
      email: email,
      name: name,
    };
    const options = { expiresIn: "1h" };
    const token = jwt.sign(payload, secret, options);

    res.status(201).json(token);
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
};
module.exports = {
  createUser,
};
