import User from "./models/User.js";
import bcrypt from "bcrypt";
import connectToDatabase from "./db/db.js";

const userRegister = async (email, pfp) => {
  connectToDatabase();
  try {
    const newUser = new User({
      email: email,
      profileImage: pfp,
    });
    await newUser.save();
    console.log(`User ${email} has been created`);
  } catch (error) {
    console.log(error);
  }
};

export default userRegister;
