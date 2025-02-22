import jwt from "jsonwebtoken";
import User from "../Model/User.js";

export const userLogin =  async (req,res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email,password})
    if(!user)
    {
        return res.status(401).json({message: "User Not Found/Wrong Password!"});
    }
    else
    {
        const accessToken = jwt.sign({ email: user.email },"tyfdft9783#$@%$usubfd873iw");
        return res.status(200).json({token: accessToken});
    }
}


export const userRegister = async (req,res) => {
    const {email, username, password} = req.body;
    if(!email || !username || !password)
    {
        return res.status(400).json({ message: "please provide all details!" });
    }
    const existingUser = await User.findOne({username});
    if(existingUser)
    {
        return res.status(400).json({ message: "User already exists!" });
    }
    const newUser = new User({ email, username, password});
    await newUser.save();
    return res.status(201).json({ message: "User registered successfully!"});
}

export const getUserByToken = async (req,res) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    jwt.verify(token, "tyfdft9783#$@%$usubfd873iw", async (err,user) =>{
        if(err)
        {
            return res.status(403).json({message:"Unauthorized User!"});
        } else 
        {
            const existingUser = await User.findOne({email: user.email});
            return res.status(200).json({existingUser});
        }
    })
}



