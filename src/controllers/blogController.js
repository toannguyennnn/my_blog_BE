const BlogService = require("../service/blogService");
const db = require("../models/index");

class BlogController {
  async getBlog(req, res) {
    let id = req.params.id;
    if (!id) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "Missing required parameters",
      });
    }

    const getBlogService = new BlogService(id);

    let blogs = await getBlogService.getBlog();

    return res.status(200).json({
      errCode: 0,
      message: "ok",
      blogs: blogs,
    });
  }

  async createBlog(req, res) {
    const createBlogService = new BlogService(
      req.body.id,
      req.body.title,
      req.body.description,
      req.body.category,
      req.body.content,
      req.body.image,
      req.body.user_id
    );

    let data = await createBlogService.createBlog();
    return res.status(201).json({
      data,
    });
  }

  async updateBlog(req, res) {
    const editBlogService = new BlogService(
      req.params.id,
      req.body.title,
      req.body.description,
      req.body.category,
      req.body.content,
      req.body.image,
      req.body.user_id
    );

    let data = await editBlogService.updateBlog(req.params.id, req.body);
    return res.status(200).json({
      data,
    });
  }

  async deleteBlog(req, res) {
    const deleteBlogService = new BlogService(req.params.id);

    let data = await deleteBlogService.deleteBlog();
    return res.status(200).json({
      data,
    });
  }
}
module.exports = BlogController;
