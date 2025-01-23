import userModel from "../../models/userModel.js";

async function allUsers(req, res) {
  try {

    const allUsers = await userModel.find();

    res.status(200).json({
      data: allUsers,
      message: "All User",
      error: false,
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

export default allUsers;
