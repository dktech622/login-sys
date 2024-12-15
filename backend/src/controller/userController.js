import { userModel } from "../model/User.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { decodedUser } from "../utils/Utils.js";

export const signUp = async (req, res, next) => {
  try {
    const isUserExist = await userModel.findOne({ email: req.body.email });
    if (isUserExist) {
      res.status(400).json({code:400, message: "User already exist" });
    }

    const hashPass =await bcrypt.hash(req.body.password,10);

    req.body.password = hashPass
    const userData = await userModel.create(req.body);
    if (userData) {
      res.status(201).json({ message: "User created" });
    }
  } catch (error) {
    next(error)
  }
};

export const login = async (req, res, next) => {
  try {
    const isUserExist = await userModel.findOne({ email: req.body.email });
    if (!isUserExist) {
      res.status(400).json({code:400, message: "User not exists" });
    }

    const isMatchPassword = await bcrypt.compare(req.body.password,isUserExist.password);
    if(!isMatchPassword){
      res.status(400).json({code:400, message: "Invalid credentials" });
    }
   
    const token = await jwt.sign({
      _id:isUserExist._id,
      name:isUserExist.name,
      email:isUserExist.email
    },process.env.SECRET_KEY,{expiresIn:"1h"});

    const decoded = decodedUser(token);
    const data = {
      token:token,
      decoded:decoded
    }

    res.status(200).json({code:200, message: "Login success" ,data:data});
  } catch (error) {
    next(error)
  }
};