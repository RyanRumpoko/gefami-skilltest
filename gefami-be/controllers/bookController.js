const pool = require("../db");

const addBook = async (req, res) => {
  try {
    const inputData = {
      title: req.body.title,
      is_returned: req.body.is_returned,
    };

    if (!inputData.title) throw "Please fill the title";

    const check = await pool.query(
      `SELECT * FROM books WHERE title='${inputData.title}'`
    );
    if (check.rows[0]) throw "Book already registered";

    await pool.query(`INSERT INTO books (title, is_returned) VALUES ($1, $2)`, [
      inputData.title,
      inputData.is_returned,
    ]);
    return res.status(200).json("Book registered successfully");
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
};

const getBook = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM books");

    return res.status(200).json(result.rows);
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
};

module.exports = {
  addBook,
  getBook,
};
