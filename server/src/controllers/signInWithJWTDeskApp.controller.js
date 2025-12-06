import User from "../schema/user.schema.js";
async function signInWithJWT(req, res) {
  try {
    const username = req.user.username;
    if (!username) {
      return res.status(403).send("Username not sent through JWT");
    }
    const existingUser = await User.findOne({ username: username })
      .select("-password")
      .lean();
    if (existingUser) {
      return res.status(200).send("Authorized to access dashboard");
    } else {
      return res.status(403).send("Not authorized to access the dasboard");
    }
  } catch (e) {
    console.log(`error in signInWithJWT.controller.js:${e}`);
    return res.status(500).send("Internal server error");
  }
}

export default signInWithJWT;
