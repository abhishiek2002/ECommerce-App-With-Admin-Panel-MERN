import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";

// register (sending data to the database or creating new user in the database)

export const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res.json({ success: false, message: "Email is already in use" });

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });

    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Registration Successfull",
    });
  } catch (error) {
    console.log("auth-controller : register : error : ", error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

// login

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // checking if user is exist or not . If not then send response "User does not exist"
    const checkUser = await User.findOne({ email });
    if (!checkUser)
      return res.json({
        success: false,
        message: "User does not exist",
      });

    // if user exist then we will check if password is correct or not . If not then send response "email or password is incorrect"
    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );
    if (!checkPasswordMatch)
      return res.json({
        success: false,
        message: "email or password is incorrect",
      });

    // if both email and password are correct then we will generate token
    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "24h" }
    );

    // after generating token we will send token as cookie and a json response with user details
    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Loggen in successfully",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        userName: checkUser.userName
      },
    });
  } catch (error) {
    console.log("auth-controller : login : error : ", error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

// logout

export const logoutUser = (req, res) => {
  // res.clearCookie("token","",{ expires: new Date(0), httpOnly: true, secure: false  }).status(200).json({
  //   success: true,
  //   message: "Logout Successfully",
  // });
  res.clearCookie("token",{ httpOnly: true, secure: false }).status(200).json({
    success: true,
    message: "Logout Successfully",
  });
};

// auth middlewares

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.json({
      success: false,
      message: "Unauthorised user",
    });

  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorised user",
      error
    });
  }
};

export default { registerUser, loginUser, logoutUser, authMiddleware };
