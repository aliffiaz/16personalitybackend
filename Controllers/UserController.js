import User from "../Models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
};

export const userRegisterGoogle = async (req, res) => {
  try {
    const { email, fullName, profilePicture } = req.body;
    if (!email || !fullName) {
      return res.status(400).json({ message: "email and fullName are required" });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        FullName: fullName,
        email: email,
        password: "",
        profilePicture: profilePicture || null
      });
      await user.save();
    }

    const token = generateToken(user._id);
    
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "User logged in with Google",
      user: {
        id: user._id,
        FullName: user.FullName,
        email: user.email,
        profilePicture: user.profilePicture,
        personalityTestsRemaining: user.personalityTestsRemaining
      },
      token,
    });
  } catch (error) {
    console.error("Google signup error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and Password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        FullName: user.FullName,
        email: user.email,
        profilePicture: user.profilePicture,
        personalityTestsRemaining: user.personalityTestsRemaining
      }
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const userSignup = async (req, res) => {
  try {
    const { FullName, email, password } = req.body;

    if (!email || !password || !FullName) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      FullName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = generateToken(newUser._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: newUser._id,
        FullName: newUser.FullName,
        email: newUser.email,
        personalityTestsRemaining: newUser.personalityTestsRemaining
      }
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const userLogout = (req, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: process.env.NODE_ENV === 'production',
      sameSite: "None",
    });
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
