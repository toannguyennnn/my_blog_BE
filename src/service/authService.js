const { where, Op } = require("sequelize");
const db = require("../models/index");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

const UserService = require("./userService");

class AuthService extends UserService {
  constructor(id, fullname, email, password, phonenumber, userGroup_id) {
    super(id, fullname, email, password, phonenumber, userGroup_id);
  }

  checkUserPassword(hashPassword) {
    return bcrypt.compareSync(this.password, hashPassword);
  }

  async getRoles(user) {
    const roles = await db.Role.findAll({
      attributes: ["id", "url", "description"],
      include: {
        model: db.UserGroup,
        where: { id: user.userGroup_id },
        attributes: ["id", "name", "description"],
      },
      nest: true,
      raw: true,
    });
    return roles;
  }

  async logIn() {
    try {
      if (!this.email || !this.password) {
        return {
          errCode: 2,
          errMessage: "Missing required parameters!",
        };
      }

      let user = await db.User.findOne({
        where: {
          email: this.email,
          // [Op.or]: [
          //   { email: inputData.email },
          //   { phonenumber: inputData.phonenumber },
          // ],
        },
        raw: true,
      });

      if (user) {
        let isCorrectPassword = this.checkUserPassword(user.password);

        if (isCorrectPassword) {
          const roles = await this.getRoles(user);
          return {
            errCode: 0,
            message: "User is authenticated...",
            user,
            roles,
          };
        } else {
          return {
            errCode: 1,
            errMessage: "Email or password is incorect...",
          };
        }
      } else {
        return {
          errCode: 1,
          errMessage: "Email or password is incorect!",
        };
      }
    } catch (error) {
      throw error;
    }
  }
}
module.exports = AuthService;
