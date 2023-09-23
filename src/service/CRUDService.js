const connectDB = require("../config/database");

const getAllStudent = async () => {
  const [results, fields] = await connectDB.execute("SELECT * FROM student");
  return results;
};

const deleteStudent = async (req, res) => {
  const studentId = req.params.id;
  await connectDB.execute("DELETE FROM student WHERE id=?", [studentId]);
};

module.exports = { getAllStudent, deleteStudent };
