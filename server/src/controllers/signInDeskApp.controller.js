import User from "../schema/user.schema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

async function signInDesk(req, res) {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(404).send("Username not registered");
    } else if (existingUser) {
      const passwordIsCorrect = await bcrypt.compare(
        password,
        existingUser.hashedPassword
      );
      if (passwordIsCorrect) {
        const bearerToken = jwt.sign(
          {
            username: existingUser.username,
            email: email,
            id: existingUser._id,
          },
          process.env.JWT_SECRET
        );
        return res.status(200).json({
          bearerToken: bearerToken,
          message: "Sign in successfull",
        });
      } else {
        return res.status(400).send("Password is incorrect");
      }
    }
  } catch (e) {
    console.log(`error in signIn.controller.js while trying to sign in: ${e}`);
    return res.status(500).send("Internal server error");
  }
}
export default signInDesk;
