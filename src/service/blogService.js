const db = require("../models/index");

class BlogService {
  constructor(id, title, description, category, content, image, user_id) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.category = category;
    this.content = content;
    this.image = image;
    this.user_id = user_id;
  }

  async getBlog() {
    try {
      let blogs = "";
      if (this.id == "all") {
        blogs = await db.Blog.findAll();
      }
      if (this.id && this.id !== "all") {
        blogs = await db.Blog.findOne({
          where: { id: this.id },
        });
      }
      return blogs;
    } catch (error) {
      throw error;
    }
  }

  async createBlog() {
    try {
      await db.Blog.create({
        title: this.title,
        description: this.description,
        category: this.category,
        content: this.content,
        image: this.image,
        user_id: this.user_id,
      });
      return {
        errCode: 0,
        message: "Create new blog successfully!",
      };
    } catch (error) {
      throw error;
    }
  }

  async updateBlog() {
    try {
      if (this.id) {
        await db.Blog.update(
          {
            title: this.title,
            description: this.description,
            category: this.category,
            content: this.content,
            image: this.image,
            user_id: this.user_id,
          },
          {
            where: {
              id: this.id,
            },
          }
        );
        return { errCode: 0, message: "Update blog successfully!" };
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

  async deleteBlog() {
    try {
      if (this.id) {
        await db.Blog.destroy({
          where: {
            id: this.id,
          },
        });
        return { errCode: 0, message: "Delete blog successfully!" };
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

module.exports = BlogService;

// let getBlog = async (blogId) => {
//   try {
//     let blogs = "";
//     if (blogId == "all") {
//       blogs = await db.Blog.findAll();
//     }
//     if (blogId && blogId !== "all") {
//       blogs = await db.Blog.findOne({
//         where: { id: blogId },
//       });
//     }
//     return blogs;
//   } catch (error) {
//     throw error;
//   }
// };

// let createBlog = async (blogData) => {
//   try {
//     await db.Blog.create({
//       title: blogData.title,
//       description: blogData.description,
//       category: blogData.category,
//       content: blogData.content,
//       image: blogData.image,
//       user_id: blogData.user_id,
//     });
//     return {
//       errCode: 0,
//       message: "Create new blog successfully!",
//     };
//   } catch (error) {
//     throw error;
//   }
// };

// let updateBlog = async (blogId, blogData) => {
//   try {
//     if (blogId) {
//       await db.Blog.update(
//         {
//           title: blogData.title,
//           description: blogData.description,
//           category: blogData.category,
//           content: blogData.content,
//           image: blogData.image,
//           user_id: blogData.user_id,
//         },
//         {
//           where: {
//             id: blogId,
//           },
//         }
//       );
//       return { errCode: 0, message: "Update blog successfully!" };
//     } else {
//       return {
//         errCode: 2,
//         errMessage: "Missing required parameters!",
//       };
//     }
//   } catch (error) {
//     throw error;
//   }
// };

// let deleteBlog = async (blogId) => {
//   try {
//     if (blogId) {
//       await db.Blog.destroy({
//         where: {
//           id: blogId,
//         },
//       });
//       return { errCode: 0, message: "Delete blog successfully!" };
//     } else {
//       return {
//         errCode: 2,
//         errMessage: "Missing required parameters!",
//       };
//     }
//   } catch (error) {
//     throw error;
//   }
// };
// module.exports = { getBlog, createBlog, deleteBlog, updateBlog };
