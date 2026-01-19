import { connectDB } from "../lib/mongoConfig.js";
import usersModel from "../lib/models/users.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


export const registerUser = async (req, res) => {
  await connectDB();
  const body = req.body;
  console.log("req body", body);
  const hashedPassword = await bcrypt.hash(body.password, 10);

  const result = await usersModel.create({
    name: body.name,
    company: body.company,
    gender: body.gender,
    username: body.username,
    password: hashedPassword,
  });

  if (result) {
    res
      .status(200)
      .json({ message: "User Created Successfully", data: result });
  } else {
    res.status(401).json({ message: "User Creation Failed" });
  }
};

export const LoginUser = async (req, res) => {
  await connectDB();
  const body = req.body;
  console.log("req body", body);
  const result = await usersModel
    .findOne({
      username: body.username,
    })
    .lean();
  if (result && (await bcrypt.compare(body.password, result.password))) {
    const token = jwt.sign(result, process.env.JWT_SECRET_KEY);
    res.status(200).json({ message: "Login Successful", token: token });
  } else {
    res.status(401).json({ message: "Invalid Credentials" });
  }
};
