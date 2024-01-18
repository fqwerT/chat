const UserPosts = require("../service/posts-service");

class UserPostsModel {
  static async getAllPosts(req, res) {
    const access = req.headers["authorization"] || undefined;
    try {
      res.status(200).json(await UserPosts.GetPosts(access));
    } catch (e) {
      res.status(400).json("something went wrong!");
    }
  }

  static async createPost(req, res) {
    const access = req.headers["authorization"] || undefined;
    const { value, id, name } = req.body;
    try {
      res.status(200).json(await UserPosts.newPost(access, value, id, name));
    } catch (e) {
      res.status(400).json(e.message);
    }
  }
}

module.exports = UserPostsModel;
