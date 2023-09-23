const connectDB = require("../config/database");

const getAllUser = async (req, res) => {
  const [results, fields] = await connectDB.execute("SELECT * FROM student");
  return res.status(200).json({
    message: "ok",
    data: results,
  });
};

const createUser = async (req, res) => {
  const { id, fullname, password, email } = req.body;
  await connectDB.execute(
    `INSERT INTO student (full_name,password,email) VALUES(?, ?, ?)`,
    [fullname, password, email]
  );
  return res.status(200).json({
    message: "ok",
  });
};

const updateUser = async (req, res) => {
  const { id, fullname, password, email } = req.body;
  await connectDB.execute(
    `UPDATE student SET full_name=?,password=?,email=? WHERE id=?`,
    [fullname, password, email, id]
  );
  return res.status(200).json({
    message: "ok",
  });
};

const deleteUser = async (req, res) => {
  const studentId = req.params.id;
  await connectDB.execute("DELETE FROM student WHERE id=?", [studentId]);
  return res.status(200).json({
    message: "ok",
  });
};

module.exports = { getAllUser, createUser, updateUser, deleteUser };
