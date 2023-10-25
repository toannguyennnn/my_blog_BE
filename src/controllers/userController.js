const UserService = require("../service/userService");

class UserController {
  async getUser(req, res) {
    const id = req.params.id;
    if (!id) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "Missing required parameters",
        users: [],
      });
    }

    const getUserService = new UserService(id);

    let users = await getUserService.getUser();
    return res.status(200).json({
      errCode: 0,
      message: "ok",
      users,
    });
  }

  async createUser(req, res) {
    
    const createUserService = new UserService(
      req.body.id,
      req.body.fullname,
      req.body.email,
      req.body.password,
      req.body.phonenumber,
      req.body.userGroup_id
    );

    let data = await createUserService.createUser();

    return res.status(201).json({
      data,
    });
  }

  async updateUser(req, res) {

    const updateUserService = new UserService(
      req.params.id,
      req.body.fullname,
      req.body.email,
      req.body.password,
      req.body.phonenumber,
      req.body.userGroup_id
    );

    let data = await updateUserService.updateUser();

    return res.status(200).json({
      data,
    });
  }

  async deleteUser(req, res) {
    const id = req.params.id;
    const deleteUserService = new UserService(id);

    let data = await deleteUserService.deleteUser();
    return res.status(200).json({
      data,
    });
  }
}

module.exports = UserController;
