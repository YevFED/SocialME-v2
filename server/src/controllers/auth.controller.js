// import { generateToken } from "../lib/utils.js";
import User from "../models/user.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (password.lenght < 8) {
      return res
        .status(400)
        .json({ massage: "Password may have min 8 symbols" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "Email already taken" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    //JWT Token creating

    const token = jwt.sign({ user: newUser }, process.env.JWTSECRET, {
      expiresIn: "7d",
    });

    return res.status(201).json({ message: "User sign uped", newUser, token });
  } catch (error) {
    return res.status(400).json({ message: "error on creating user" + error });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userInfo = await User.findOne({ email });

    if (!userInfo) {
      return res.status(400).json({ message: "Incorrect email or password" });
    }

    const matchPass = await bcrypt.compare(password, userInfo.password);

    if (!matchPass) {
      return res.status(400).json({ message: "Incorrect email or password" });
    }

    const user = { user: userInfo };

    const token = jwt.sign(user, process.env.JWTSECRET, {
      expiresIn: "7d",
    });

    return res.status(200).json({
      message: "User loggined ",
      user,
      email,
      token,
    });
  } catch (error) {
    console.log(error);
  }
};

export const logout = (req, res) => {
  try {
    res.status(200).json({ message: "Log out success" });
  } catch (error) {
    console.log("Error with loging out " + error.message);
    res.status(500).json({ message: "U already loged out" });
  }
};
