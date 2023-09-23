const { where } = require("sequelize");
const db = require("../models/index");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: {
          email: userEmail,
        },
      });
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};

let hashUserPassword = (password) => {
  return new Promise((resolve, reject) => {
    try {
      const hashPassword = bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (error) {
      reject(error);
    }
  });
};

let getUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId == "all") {
        users = await db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
        });
      }
      if (userId && userId !== "all") {
        users = await db.User.findOne({
          where: { id: userId },
          attributes: {
            exclude: ["password"],
          },
        });
      }
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};

let createUser = async (userData) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (userData.email && userData.password) {
        let isExistedEmail = await checkUserEmail(userData.email);
        if (isExistedEmail) {
          resolve({
            errCode: 1,
            errMessage:
              "This email has already in used, plz try another email!",
          });
        }
        let hashUserPasswordFromBcrypt = await hashUserPassword(
          userData.password
        );
        await db.User.create({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          password: hashUserPasswordFromBcrypt,
          phonenumber: userData.phonenumber,
          address: userData.address,
          gender: userData.gender,
          avatar: userData.avatar,
          roleId: userData.roleId,
        });
        resolve({
          errCode: 0,
          message: "Create new user successfully!",
        });
      } else {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameters!",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { getUser, createUser };