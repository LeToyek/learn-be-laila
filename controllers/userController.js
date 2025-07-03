const { User } = require("../models");
const bcrypt = require("bcryptjs");

class UserController {
  static async getUsers(req, res) {
    try {
      const users = await User.findAll({
        attributes: { exclude: ["password"] },
      });
      res.status(200).json({
        status: "success",
        data: users,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  static async createUser(req, res) {
    try {
      const { first_name, last_name, email, password } = req.body;
      if (!first_name || !last_name || !email || !password) {
        return res.status(400).json({
          status: "error",
          message: "All fields are required",
        });
      }

      const hashedPassword = bcrypt.hashSync(password, 10);

      const newUser = await User.create({
        first_name,
        last_name,
        email,
        password: hashedPassword,
      });

      res.status(201).json({
        status: "success",
        data: {
          id: newUser.id,
          first_name: newUser.first_name,
          last_name: newUser.last_name,
          email: newUser.email,
        },
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  static async updateUser(req, res) {
    try {
      const id = req.params.id;
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({
          status: "error",
          message: "User not found",
        });
      }

      const { first_name, last_name, email } = req.body;

      await user.update({
        first_name: first_name || user.first_name,
        last_name: last_name || user.last_name,
        email: email || user.email,
      });

      res.status(200).json({
        status: "success",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  static async deleteUser(req, res) {
    try {
      const id = req.params.id;
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({
          status: "error",
          message: "User not found",
        });
      }

      await user.destroy();

      res.status(200).json({
        status: "success",
        message: "User deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }
}

module.exports = { UserController };
