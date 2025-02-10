import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../Models/User.js";

// Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Registration failed", error });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isCorrect = bcrypt.compare(password, user.password);
    if (!user || !isCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "12h",
      }
    );

    res.status(200).json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
};
