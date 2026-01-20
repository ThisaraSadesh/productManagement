import usersModel from "../models/users.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { connectDB } from "../mongoConfig.js";
import companiesModel from "../models/companies.js";

export const registerUser = async (req, res) => {
  await connectDB();
  const body = req.body;
  const hashedPassword = await bcrypt.hash(body.password, 10);

  const companyResult = await companiesModel.create({
    name: body.company_name,
  });

  if (companyResult) {
    const result = await usersModel.create({
      name: body.name,
      company_id: companyResult._id,
      gender: body.gender,
      username: body.username,
      password: hashedPassword,
    });

    if (result) {
      res
        .status(200)
        .json({
          message: "User and Company Created Successfully",
          data: result,
        });
    } else {
      res.status(401).json({ message: "User Creation Failed" });
    }
  } else {
    res.status(401).json({ message: "Company Creation Failed" });
  }
};

export const LoginUser = async (req, res) => {
  await connectDB();
  const body = req.body;
  const result = await usersModel
    .findOne({
      username: body.username,
    })
    .lean();
  if (result && (await bcrypt.compare(body.password, result.password))) {
    const token = jwt.sign(
      {
        user_id: result._id,
        company_id: result.company_id,
        role: result.role,
      },
      process.env.JWT_SECRET_KEY,
    );

    res.status(200).json({ message: "Login Successful", token: token });
  } else {
    res.status(401).json({ message: "Invalid Credentials" });
  }
};
