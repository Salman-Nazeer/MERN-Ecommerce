import userModel from "../../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

async function userSignInController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email) {
      throw new Error("Plese provide email");
    }
    if (!password) {
      throw new Error("Plese provide password");
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User is not found");
    }

    const checkPassword = await bcrypt.compare(password, user.password);


    if (checkPassword) {
      const tokenData = {
        _id: user._id,
        email: user.email,
      };
      const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
        expiresIn: 60 * 60 * 8,
      });


      const tokenOption = {
        // httpOnly: true,
        // secure: true,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        sameSite: 'strict',
      };
      res.cookie("token", token, tokenOption).status(200).json({
        message: "User login successfully",
        data: token,
        success: true,
        error: false,
      });
    } else {
      throw new Error("Please check password");
    }
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

export default userSignInController;
