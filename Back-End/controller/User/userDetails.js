import userModel from "../../models/userModel.js";

async function userDetailsController(req, res) {
  try {
    const user = await userModel.findById(req.userId);

    res.status(200).json({
      data: user,
      message: "user details",
      error: false,
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      succes: false,
    });
  }
}

export default userDetailsController;
