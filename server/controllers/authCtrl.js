const Users = require('../models/userSchema')
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")





const authCtrl =  {

    register: async(req,res) => {
        const {fullname,username,email,password,gender} = req.body
        if(!fullname || !email||!username||!gender||!password ){
            return res.status(422).json({error: "please fill it"});
        }
        try{

            // use to trim spaces if present in username
            let newUserName = username.toLowerCase().replace(/ /g,'')
            // console.log(username)

            const user_name = await Users.findOne({username:newUserName})
            if(user_name){
                return res.status(422).json({msg: "UserName already exist"});
            }

            const user_email = await Users.findOne({email})
            if(user_email){
                return res.status(422).json({msg: "Email already exist"});
            }
            if(password.length<6){
                return res.status(422).json({msg: "Password is small"});
            }


            const passwordHash = await bcrypt.hash(password , 12)
            // console.log(passwordHash);


            const newUser = new Users({
                fullname,username:newUserName,email,password:passwordHash,gender
            })

            const access_token = createAccessToken({id: newUser._id})
            const refresh_token = createRefreshToken({id: newUser._id})
            // console.log({access_token,refresh_token})

            res.cookie('refreshtoken',refresh_token,{
                httpOnly: true,
                path: '/api/refresh_token',
                maxAge: 30*24*60*60*1000  // 30days
            })


            await newUser.save()


            res.status(201).json({message: "Registered successfully!!!",access_token,user:{
                ...newUser._doc,
                password: ''
            }})

        } catch(err){
            return res.status(400).json({msg: err.message});
        }
    },



    login: async(req,res) => {

        const {email,password} = req.body
        if(!email||!password){
            return res.status(400).json({error: "Please fill it!!!"});
        }
        try{
            // const user = await Users.findOne({email}).populate("followers following" , "-password")
            const user = await Users.findOne({email})
            .populate("followers following", "avatar username fullname followers following")

            if(!user)
                return res.status(400).json({msg: "Email does not exist"});
            
            const isMatch = await bcrypt.compare(password,user.password)

            if(!isMatch)
                return res.status(400).json({msg: "Password does not match"});
            

            const access_token = createAccessToken({id: user._id})
            const refresh_token = createRefreshToken({id: user._id})

            res.cookie('refreshtoken',refresh_token,{
                httpOnly: true,
                path: '/api/refresh_token',
                maxAge: 30*24*60*60*1000  // 30days
            })


            res.status(201).json({message: "Login successfully!!!",access_token,user:{
                ...user._doc,
                password: ''
            }})

        } catch(err){
            return res.status(400).json({msg: err.message});
        }
    },



    logout: async(req,res) => {
        try{

            res.clearCookie('refreshtoken', {path:'/api/refresh_token'})
            return res.status(200).json({msg: 'logged Out'})
            
        } catch(err){
            return res.status(400).json({msg: err.message});
        }
    },



    generateAccessToken: async(req,res) => {
        try{
            const rf_token = req.cookies.refreshtoken
            // console.log({rf_token})
            if(!rf_token) return res.status(400).json({msg: "Please login Now"})

            jwt.verify(rf_token,process.env.SECRET_REFRESH_TOKEN,async (err , result) => {
                if(err) return res.status(400).json({msg: err.message})

                const user = await Users.findById(result.id).select("-password")
                .populate('followers following', 'avatar username fullname followers following')
                if(!user)  return res.status(400).json({msg: "This does not exist."})

                const access_token = createAccessToken({id: result.id})

                res.json({
                    access_token,
                    user
                })
            })

        } catch(err){
            return res.status(400).json({msg: err.message});
        }
    }
}




const createAccessToken = (payload) => {
    return jwt.sign(payload , process.env.SECRET_ACCESS_TOKEN,{expiresIn: '1d'})
}
const createRefreshToken = (payload) => {
    return jwt.sign(payload , process.env.SECRET_REFRESH_TOKEN,{expiresIn: '30d'})
}

module.exports = authCtrl