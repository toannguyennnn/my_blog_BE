const { where } = require("sequelize");
const db = require("../models/index");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

class UserService {
  constructor(id, fullname, email, password, phonenumber, userGroup_id) {
    this.id = id;
    this.fullname = fullname;
    this.email = email;
    this.password = password;
    this.phonenumber = phonenumber;
    this.userGroup_id = userGroup_id;
  }

  async checkUserEmail() {
    try {
      let user = await db.User.findOne({
        where: {
          email: this.email,
        },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  hashUserPassword() {
    try {
      const hashPassword = bcrypt.hashSync(this.password, salt);
      return hashPassword;
    } catch (error) {
      throw error;
    }
  }

  async getUser() {
    try {
      let users = "";
      if (this.id == "all") {
        users = await db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
        });
      }
      if (this.id && this.id !== "all") {
        users = await db.User.findOne({
          where: { id: this.id },
          attributes: {
            exclude: ["password"],
          },
        });
      }
      return users;
    } catch (error) {
      throw error;
    }
  }

  async createUser() {
    try {
      if (!this.email || !this.password) {
        return {
          errCode: 2,
          errMessage: "Missing required parameters!",
        };
      }

      let isExistedEmail = await this.checkUserEmail();
      if (isExistedEmail) {
        return {
          errCode: 1,
          errMessage: "This email has already in used, plz try another email!",
        };
      }

      const hashUserPasswordFromBcrypt = this.hashUserPassword();

      const newUser = await db.User.create({
        fullname: this.fullname,
        email: this.email,
        password: hashUserPasswordFromBcrypt,
        phonenumber: this.phonenumber,
        userGroup_id: this.userGroup_id || 2, // default userGroup: member
      });
      return {
        errCode: 0,
        message: "Create new user successfully!",
        user: newUser.dataValues,
      };
    } catch (error) {
      throw error;
    }
  }

  async updateUser() {
    try {
      if (this.id) {
        await db.User.update(
          {
            fullname: this.fullname,
            email: this.email,
            phonenumber: this.phonenumber,
            userGroup_id: this.userGroup_id,
          },
          {
            where: {
              id: this.id,
            },
          }
        );
        return { errCode: 0, message: "Update user successfully!" };
      } else {
        return {
          errCode: 2,
          errMessage: "Missing required parameters!",
        };
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteUser() {
    try {
      if (this.id) {
        await db.User.destroy({
          where: {
            id: this.id,
          },
        });
        return { errCode: 0, message: "Delete user successfully!" };
      } else {
        return {
          errCode: 2,
          errMessage: "Missing required parameters!",
        };
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserService;
