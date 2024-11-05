const pool = require("../db");
const { createToken } = require("../middlewares/auth");

const register = async (req, res) => {
  const inputData = {
    username: req.body.username,
    password: req.body.password,
  };
  try {
    const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    const validatePassword = (password) => {
      return String(password).match(/^(?=.*[A-Z])(?!.*\W)(?!.* ).{8,16}$/);
    };

    const emailValidate = validateEmail(inputData.username);
    if (!emailValidate) throw "Invalid email address";

    const passwordValidate = validatePassword(inputData.password);
    if (!passwordValidate)
      throw "Password must contain at least 1 Uppercase, no special character and 8 character long";

    const check = await pool.query(
      `SELECT * FROM users WHERE username='${inputData.username}'`
    );
    if (check.rows[0]) throw "Username is used";

    await pool.query(`INSERT INTO users (username, password) VALUES ($1, $2)`, [
      inputData.username,
      inputData.password,
    ]);
    return res.status(200).json("User created successfully");
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
};

const login = async (req, res) => {
  const inputData = {
    username: req.body.username,
    password: req.body.password,
  };
  try {
    const result = await pool.query(
      `SELECT * FROM users WHERE username='${inputData.username}' LIMIT 1`
    );
    if (!result.rows[0]) throw "Invalid email or password";
    if (result.rows[0].password !== inputData.password)
      throw "Invalid email or password";
    const accessToken = createToken({ username: result.rows[0].username });
    return res
      .status(200)
      .json({ username: result.rows[0].username, accessToken });
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
};

module.exports = {
  register,
  login,
};
