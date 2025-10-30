import User from "../schema/user.schema.js";
async function showProfileInfo(req, res) {
  try {
    const id = req.user.id;
    const existingUser = await User.findById(id).select(
      "-hashedPassword -updatedAt"
    );
    if (!existingUser) {
      return res.status(404).send("No such user exists");
    } else {
      return res.status(200).json({ existingUser });
    }
  } catch (e) {
    console.log(`error in myProfile controller: ${e}`);
    return res.status(500).send("Internal server error");
  }
}
export default showProfileInfo;
