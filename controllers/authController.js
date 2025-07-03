const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: "error",
      message: "Email and password are required",
    });
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        status: "error",
        message: "Invalid email or password",
      });
    }

    // ✅ Tandai sebagai logged in
    await user.update({ is_logged_in: true });

    const payload = {
      id: user.id,
      email: user.email,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      status: "success",
      message: "Login successful",
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

exports.logout = async (req, res) => {
  try {
    const userId = req.user.id;

    await User.update({ is_logged_in: false }, { where: { id: userId } });

    return res.status(200).json({
      status: "success",
      message: "Logout successful",
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "Logout failed",
    });
  }
};
