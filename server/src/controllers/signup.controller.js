import User from "../schema/user.schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
async function signUp(req, res) {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });
    if (existingUser) {
      if (existingUser.username == username) {
        return res.status(400).send("Username already taken");
      } else if (existingUser.email == email) {
        return res.status(400).send("Email already in use");
      }
    } else if (!existingUser) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username: username,
        email: email,
        hashedPassword: hashedPassword,
      });
      const bearerToken = jwt.sign(
        { username: username, email: email, id: newUser._id },
        process.env.JWT_SECRET
      );
      await newUser.save();
      return res.status(200).json({
        bearerToken: bearerToken,
        message: "User added successfully",
      });
    }
  } catch (e) {
    console.log(`error in signup.controller.js while trying to sign up: ${e}`);
    return res.status(500).send("Internal server error");
  }
}
export default signUp;
