const db = require("../models/index");

let getBlog = (blogId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let blogs = "";
      if (blogId == "all") {
        blogs = await db.Blog.findAll();
      }
      if (blogId && blogId !== "all") {
        users = await db.Blog.findOne({
          where: { id: userId },
        });
      }
      resolve(blogs);
    } catch (error) {
      reject(error);
    }
  });
};

// let createUser = async (userData) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       if (userData.email && userData.password) {
//         let isExistedEmail = await checkUserEmail(userData.email);
//         if (isExistedEmail) {
//           resolve({
//             errCode: 1,
//             errMessage:
//               "This email has already in used, plz try another email!",
//           });
//         }
//         let hashUserPasswordFromBcrypt = await hashUserPassword(
//           userData.password
//         );
//         await db.User.create({
//           firstName: userData.firstName,
//           lastName: userData.lastName,
//           email: userData.email,
//           password: hashUserPasswordFromBcrypt,
//           phonenumber: userData.phonenumber,
//           address: userData.address,
//           gender: userData.gender,
//           avatar: userData.avatar,
//           roleId: userData.roleId,
//         });
//         resolve({
//           errCode: 0,
//           message: "Create new user successfully!",
//         });
//       } else {
//         resolve({
//           errCode: 2,
//           errMessage: "Missing required parameters!",
//         });
//       }
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

// let updateUser = (userId, userData) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       if (userId) {
//         await db.User.update(
//           {
//             firstName: userData.firstName,
//             lastName: userData.lastName,
//             email: userData.email,
//             phonenumber: userData.phonenumber,
//             address: userData.address,
//             gender: userData.gender,
//             roleId: userData.roleId,
//           },
//           {
//             where: {
//               id: userId,
//             },
//           }
//         );
//         resolve({ errCode: 0, message: "Update user successfully!" });
//       } else {
//         resolve({
//           errCode: 2,
//           errMessage: "Missing required parameters!",
//         });
//       }
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

// let deleteUser = (userId) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       if (userId) {
//         await db.User.destroy({
//           where: {
//             id: userId,
//           },
//         });
//         resolve({ errCode: 0, message: "Delete user successfully!" });
//       } else {
//         resolve({
//           errCode: 2,
//           errMessage: "Missing required parameters!",
//         });
//       }
//     } catch (error) {
//       reject(error);
//     }
//   });
// };
module.exports = { getBlog };
