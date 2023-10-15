const db = require("../models/index");

let getBlog = (blogId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let blogs = "";
      if (blogId == "all") {
        blogs = await db.Blog.findAll();
      }
      if (blogId && blogId !== "all") {
        blogs = await db.Blog.findOne({
          where: { id: blogId },
        });
      }
      resolve(blogs);
    } catch (error) {
      reject(error);
    }
  });
};

let createBlog = async (blogData) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Blog.create({
        title: blogData.title,
        description: blogData.description,
        category: blogData.category,
        content: blogData.content,
        author: blogData.author,
        image: blogData.image,
        userId: blogData.userId,
      });
      resolve({
        errCode: 0,
        message: "Create new blog successfully!",
      });
    } catch (error) {
      reject(error);
    }
  });
};

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

let deleteBlog = (blogId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (blogId) {
        await db.Blog.destroy({
          where: {
            id: blogId,
          },
        });
        resolve({ errCode: 0, message: "Delete blog successfully!" });
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
module.exports = { getBlog, createBlog, deleteBlog };
