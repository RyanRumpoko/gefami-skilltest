const pool = require("../db");

const getCustomer = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM customers");

    return res.status(200).json(result.rows);
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
};

const addCustomer = async (req, res) => {
  try {
    const inputData = {
      name: req.body.name,
      phone_number: req.body.phone_number,
      book_title: req.body.book_title,
      in_date: req.body.in_date,
      out_date: req.body.out_date,
      is_late: req.body.is_late,
    };

    const check = await pool.query(
      `SELECT * FROM books WHERE title='${inputData.book_title}'`
    );
    if (check.rowCount === 0) {
      throw "Book not registered";
    } else if (!check.rows[0].is_returned) {
      throw "Book has not been returned";
    }

    await pool.query(
      `INSERT INTO customers (name, phone_number, book_title, in_date, out_date, is_late) VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        inputData.name,
        inputData.phone_number,
        inputData.book_title,
        inputData.in_date,
        inputData.out_date,
        inputData.is_late,
      ]
    );
    await pool.query(
      `UPDATE books SET is_returned = $1 WHERE id=${check.rows[0].id}`,
      [false]
    );
    return res.status(200).json("Customer created successfully");
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
};

module.exports = {
  getCustomer,
  addCustomer,
};
