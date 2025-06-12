import User from "../models/user.models.js";
import cloudinary from "../lib/cloudinary.js";

export const getUser = async (req, res) => {
  const user = req.user;

  const isUser = await User.findOne({ email: user.email });

  if (!isUser) {
    return res.status(401);
  }

  return res.json({
    user: {
      fullName: isUser.fullName,
      email: isUser.email,
      _id: isUser._id,
      profilepic: isUser.profilepic,
    },
  });
};

export const searchUser = async (req, res) => {
  if (!req.body.name) {
    return res.status(400);
  }

  const { name } = req.body.name;

  const users = await User.find(
    { fullName: { $regex: name, $options: "i" } },
    { password: 0, createdAt: 0, updatedAt: 0, __v: 0 }
  );

  const filteredUsers = users.filter((user) => !user._id.equals(req.user._id));

  return res.status(200).json(filteredUsers);
};

export const editUser = async (req, res) => {
  try {
    const user = req.user;

    const { newEmail, newName } = req.body;

    const updateduser = await User.findByIdAndUpdate(
      user._id,
      { email: newEmail, fullName: newName },
      { new: true }
    );

    if (!updateduser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updateduser);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const UploadPhoto = async (req, res) => {
  const { image } = req.body;

  let imageUrl;

  try {
    const uploadResponse = await cloudinary.uploader.upload(image);
    imageUrl = uploadResponse.secure_url;

    await User.updateOne(
      { _id: req.user._id },
      { $set: { profilepic: imageUrl } }
    );

    return res.status(200).json({ url: imageUrl });
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};
