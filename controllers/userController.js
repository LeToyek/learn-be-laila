const users = [
    {
        id: 1,
        first_name: 'Lailatul',
        last_name: 'Badriyah',
        email: 'lailatulbadriyah654@gmail.com'
    },
    {
        id: 2,
        first_name: 'Maulana',
        last_name: 'Arif',
        email: 'maulanatoyek@gmail.com'
    },
    {
        id: 3,
        first_name: 'Zanif',
        last_name: 'Nisa',
        email: 'zanifnisa@gmail.com'
    }
]

class UserController {
  static async getUsers(res) {
    try {
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
      const { first_name, last_name, email } = req.body;
      if (!first_name || !last_name || !email) {
        return res.status(400).json({
          status: "error",
          message: "All fields are required",
        });
      }
      const newUser = {
        id: users.length + 1,
        first_name,
        last_name,
        email,
      };
      users.push(newUser);
      res.status(200).json({
        status: "success",
        data: newUser,
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
      const id = parseInt(req.params.id);
      const user = users.find((u) => u.id === id);

      if (!user) {
        return res.status(404).json({
          status: "error",
          message: "User not found",
        });
      }

      user.first_name = req.body.first_name || user.first_name;
      user.last_name = req.body.last_name || user.last_name;
      user.email = req.body.email || user.email;

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

  static deleteUser(req, res) {
    try {
      const id = parseInt(req.params.id);
      const index = users.findIndex((user) => user.id === id);

      if (index === -1) {
        return res.status(404).json({ 
            status: "error",
            message: "User not found"
        });
      }
      users.splice(index, 1);
      res.status(200).json({
        status: "success",
        message: "User deleted successfully"
    });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message
    });
    }
  }
}

module.exports = UserController;
