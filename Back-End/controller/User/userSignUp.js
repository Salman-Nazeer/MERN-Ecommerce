import userModel from "../../models/userModel.js";
import bcrypt from "bcryptjs";

async function userSignUpContoller(req, res) {
  try {
    // HERE I CAN GIVE COMPULSARE FIELD WHICH USER GIVE
    const { name, email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (user) {
      throw new Error("This email is alredy exits");
    }

    if (!name) {
      throw new Error("Plese provide name");
    }
    if (!email) {
      throw new Error("Plese provide email");
    }
    if (!password) {
      throw new Error("Plese provide password");
    }

    //   SAVE TO DATABASE
    /** CONVERT PASSWORD IN HASH FORM */
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    if (!hashPassword) {
      throw new Error("Password hashing failed");
    }

    const payload = {
      ...req.body,
      role: "GENERAL",
      password: hashPassword,
    };

    const userData = new userModel(payload);
    // await IS ADD ACCORDIG TO AI
    const saveUser = await userData.save();

    res.status(201).json({
      data: saveUser,
      success: true,
      error: false,
      message: "User created successfully",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

export default userSignUpContoller;
