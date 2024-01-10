import { userModel } from "../../models/auth/user.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; // Import jwt module

const createToken = (email) => {
  const tokenKey = process.env.JWT_KEY;
  return jwt.sign({ email }, tokenKey, { expiresIn: "3d" });
};

export const registerController = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await userModel.findOne({ email });

    if (user)
      return res
        .status(400)
        .json({ msg: "User already registered with this email" });
    if (!name || !email || !password)
      return res.status(400).json({ msg: "All fields required" });

    if (!validator.isEmail(email))
      return res.status(400).json({ msg: "Email must be in a valid format" });
    if (!validator.isStrongPassword(password))
      return res.status(400).json({ msg: "Password must be strong" });

    user = new userModel({ name, email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save(); // Save the user, not the salt

    res.status(200).json({
      msg: "User registered successfully",
      user: {
        email: email,
        name: name,
      },
      token: createToken(email),
    });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
};
export const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await userModel.findOne({ email });

    if (!user)
      return res.status(400).json({ msg: "Invalid Email or password" });
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return res.status(400).json({ msg: "Invalid Email or password" });

    res.status(200).json({
      msg: "User login successfully",
      user: {
        id: user._id,
        email: email,
        name: user.name,
      },
      token: createToken(email),
    });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
};

export const findUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    let user = await userModel.findById(userId);
    res.status(200).json({
      msg: "User find successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });

    console.log("error");
  }
};
export const getUsers = async (req, res) => {
  try {
    let user = await userModel.find();
    res.status(200).json({
      msg: "User fetch  successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });

    console.log("error");
  }
};
