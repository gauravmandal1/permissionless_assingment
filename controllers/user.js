
import User from "../models/User.js"
import bcrypt from "bcrypt"
import crypto from "crypto"
import jwt from "jsonwebtoken"
import cookieparser from "cookie-parser"
import nodemailer from "nodemailer";

const createToken =(id)=>{
  return jwt.sign({id},"yahihaisecrettoken" )
}

var transporter = nodemailer.createTransport({
  service : 'gmail', 
  auth:{
    user: 'pseudopsy0@gmail.com',
    pass: 'shyurftvwysyhcuf'
  },
  tls:{
    rejectUnauthorized : false
  }
}) 

export default {
  onGetUserById: async (req, res) => {
    try {
      const user = await UserModel.getUserById(req.params.id);
      return res.status(200).json({ success: true, user });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },
  onCreateUser: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const user = new User({
        name,
        email,
        password,
        emailToken: crypto.randomBytes(64).toString('hex'),
        isVerified: false
      });
      const salt = await bcrypt.genSalt(10)
      const hashPassword = await bcrypt.hash(user.password,salt)
      user.password = hashPassword
      const newUser = await user.save()
      var mailOptions = {
        from: ' "Verify your mail " <pseudopsy0@gmail.com> ',
        to :user.email, 
        subject: 'Pseudo -veifiy your mail',
        html: `<h2> ${user.name} ! Thanks for registering on our site 
              <h4> Please veify your mail to conitnue ....</h4>
              <a href="http://${req.headers.host}/user/veify-email?token=${user.emailToken}">Verify your Email</a>`
      }
      transporter.sendMail(mailOptions,function(error,info){
        if (error){
          console.log(error)
        }
        else{
          console.log('Veification mail sent to your gmail account')
        }
      })
      // res.redirect('/user/login')
      return res.status(200).json({ success: true, newUser });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, errormessage: error });
    }
  },
  userLogin: async(req, res)=> {
    try {
      const {email,password} =req.body
      const findUser = await User.findOne({email:email})
      if (findUser) {
        const match = await bcrypt.compare(password, findUser.password)
        if (match) {
          const token = createToken(findUser.id)
          console.log(token)
          res.cookie('access-token',token)
          console.log('logged in ')

          // return res.json({success:true  })
        }
        else{
          consloe.log("Invalid password")
        }

      }else{
        console.log('Ayo go and sign up user does not exist ')
      }
      
    } catch (error) {
      console.log(error);
      
    }

  },
};
