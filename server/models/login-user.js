const db = require("../database/db.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secret = "zasdfasfasdax";

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const find = 'SELECT * FROM users_list WHERE email = $1 AND password = $2'
    const user = await db.query(find, [email, password]);
    if (user.rows.length <= 0) {
        res.status(400).json(`пользователь не найден`)
    } else {
         
        res.status(200).json(user.rows)
    }
};
module.exports = {
    loginUser,
};
