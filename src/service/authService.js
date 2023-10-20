const { where, Op } = require("sequelize");
const db = require("../models/index");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

let checkUserEmail = async (userEmail) => {
  try {
    const user = await db.User.findOne({
      where: {
        email: userEmail,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
};

let hashUserPassword = (password) => {
  try {
    const hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
  } catch (error) {
    throw error;
  }
};

let checkUserPassword = (inputPassword, hashPassword) => {
  return bcrypt.compareSync(inputPassword, hashPassword);
};

let signUp = async (userData) => {
  try {
    if (!userData.email || !userData.password) {
      return {
        errCode: 2,
        errMessage: "Missing required parameters!",
      };
    }

    let isExistedEmail = await checkUserEmail(userData.email);
    if (isExistedEmail) {
      return {
        errCode: 1,
        errMessage: "This email has already in used, plz try another email!",
      };
    }

    const hashUserPasswordFromBcrypt = hashUserPassword(userData.password);

    const newUser = await db.User.create({
      fullname: userData.fullname,
      email: userData.email,
      password: hashUserPasswordFromBcrypt,
      phonenumber: userData.phonenumber,
      userGroup_id: userData.userGroupId,
    });
    return {
      errCode: 0,
      message: "Create new user successfully!",
      user: newUser.dataValues,
    };
  } catch (error) {
    throw error;
  }
};

let logIn = async (inputData) => {
  try {
    if (!inputData.email || !inputData.password) {
      return {
        errCode: 2,
        errMessage: "Missing required parameters!",
      };
    }

    let user = await db.User.findOne({
      where: {
        email: inputData.email,
        // [Op.or]: [
        //   { email: inputData.email },
        //   { phonenumber: inputData.phonenumber },
        // ],
      },
    });

    if (user) {
      let isCorrectPassword = checkUserPassword(
        inputData.password,
        user.dataValues.password
      );

      if (isCorrectPassword) {
        return {
          errCode: 0,
          message: "User is authenticated...",
          user: user,
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
};

module.exports = { signUp, logIn };
