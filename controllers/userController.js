const bcrypt = require('bcryptjs');
const User = require("../models/User");

const createUser = async (req, res) => {
  try {
    const { fullname, emailaddr, passwrd } = req.body;
    const name = fullname ?? "";
    const email = emailaddr ?? "";
    const password = passwrd ?? "";

    // Validate for empty fields
    if (!name.trim()) {
      return res.status(400).json({ message: "Name is required.", success: false });
    }

    if (!email.trim()) {
      return res.status(400).json({ message: "Email is required.", success: false });
    }

    if (!password.trim()) {
      return res.status(400).json({ message: "Password is required.", success: false });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({ name, email, password: hashedPassword });

    if (!user) {
      return res.status(422).json({ message: "User creation failed", success: false,});
    }

    return res.status(201).json({
      message: "User created successfully",
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const getOneUser = async (req, res) => {
  try {
    // const { id } = req.body;
    const id = req.params.id ?? "";

    if (!id.trim()) {
      return res.status(400).json({ message: "ID is required", success: false });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({message: "User not found", success: false, });
    }

    return res.status(201).json({
      message: "Found successfully",
      success: true,
      user,
    });
  }
  catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
}

const getUsers = async (req, res) => {
  try {

    const user = await User.find().sort({ createdAt: -1 }).limit(4);

    if (!user) {
      return res.status(404).json({message: "No user was found", success: false,});
    }

    return res.status(201).json({
      message: "Users found successfully",
      success: true,
      user,
    });
  }
  catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
}

const checkUser = async (req, res) => {
  try {
    const { emailaddr, passwrd } = req.body;
    const email = emailaddr ?? "";
    const password = passwrd ?? "";

    // Validate for empty fields
    if (!email.trim()) {
      return res.status(400).json({ message: "Email is required.", success: false });
    }

    if (!password.trim()) {
      return res.status(400).json({ message: "Password is required.", success: false });
    }


    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({message: "User not found", success: false,});
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(404).json({message: "Wrong credentials", success: false,});
    }

    return res.status(201).json({
      message: "User created successfully",
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
}

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id ?? "";

    if (!id.trim()) {
      return res.status(400).json({ message: "ID is required", success: false });
    }

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({message: "User not found", success: false, });
    }

    return res.status(200).json({
      message: "Deleted successfully",
      success: true,
    });
  }
  catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
}


module.exports = {
  createUser,
  getOneUser,
  getUsers,
  checkUser,
  deleteUser,
};
