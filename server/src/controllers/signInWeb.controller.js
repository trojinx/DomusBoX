import User from "../schema/user.schema.js";
import bcrypt from "bcrypt";

async function signInWeb(req, res, next) {
  try {
    const { username, password } = req.headers;

    const existingUser = await User.findOne({ username: username });

    if (!existingUser) {
      return res.status(404).send("Username not registered");
    } else if (existingUser) {
      const passwordIsCorrect = await bcrypt.compare(
        password,
        existingUser.hashedPassword
      );
      if (passwordIsCorrect) {
        return next(); // give control to next controller
      } else {
        return res.status(400).send("Password is incorrect");
      }
    }
  } catch (e) {
    console.log(`error in signIn.controller.js while trying to sign in: ${e}`);
    return res.status(500).send("Internal server error");
  }
}
export default signInWeb;
