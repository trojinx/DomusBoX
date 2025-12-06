async function respond200(req, res) {
  return res.status(200).send("file uploaded successfully");
}
export default respond200;
