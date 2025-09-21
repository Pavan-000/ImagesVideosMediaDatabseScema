import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const register = async (req, res) => {
    try {
        const {username, password } = req.body;
        const userExists = await User.findOne({username});
        
        if(userExists){
            res.status(400).json({message : "User already exists"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({username, password : hashedPassword});

        res.status(201).json({message : "userRegistered", userId : user._id});

    } catch (error) {
        res.status(500).json({message : "Server error"});
    }
};

const login = async (req, res) => {
    try {
        const {username , password} = req.body;
        const user = await User.findOne({username});
        
        if(!user) return res.status(400).json({message : "Invalid credentials"});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch)    return res.status(400).json({message : "Invalid credentials"});
        
        const token = jwt.sign({id : user._id}, process.env.SECRET_KEY, {expiresIn : '1d'});
        res.json({token});

    } catch (error) {
        res.status(500).json({message : "Server error"});
    }
};

module.exports = {login, register};