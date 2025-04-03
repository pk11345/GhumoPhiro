const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(
    cors({
        origin: "http://localhost:5173", // Adjust this based on your frontend URL
        credentials: true, // Important to allow cookies to be sent
      })
);
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

mongoose.connect("mongodb://localhost:27017/Hotel")

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
})

const usermodel= new mongoose.model("user", userSchema)

const adminSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
})

const adminmodel= new mongoose.model("admin", userSchema)

app.post("/UserSignup", async (req,res)=>{
    const {name,email,password}= req.body
    console.log(req.body)

    let user  = await usermodel.findOne({email})
    if(user) {
     res.status(400).send("User already registered");
        
    }

    bcrypt.genSalt(10,(err,salt)=>{
        // console.log(salt)
        bcrypt.hash(password,salt, async (err,hash)=>{         // accepts something
            // console.log(hash)   hash is the password jo hume save krna h
         let user =  new usermodel({
               name,
               email,
                password:hash
            })
            await user.save()
            let token =  jwt.sign({email:email},"shhhh");  //shhhh is secret key in real app we dont write like this
            console.log(token)
         res.cookie("token", token, {
            httpOnly: true, // Prevents client-side access
            
            sameSite: "strict", // Prevent CSRF attacks
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
          }) 
        //    console.log(a,"cookie")
            res.send("registered")
        })
      })
})

app.post("/UserLogin", async (req,res)=>{
    const {email,password}= req.body
    // console.log(req.body)

    let user  = await usermodel.findOne({email})
    if(!user) {
    return res.status(400).send("User not registered");
        
    }
    bcrypt.compare(password,user.password, (err,result)=>{
        if(result) {
          
            let token =  jwt.sign({email:email},"shhhh");  
             res.cookie("token",token, {
                httpOnly: true,
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
              })
            // console.log("Cookie Set:", token);
            return res.status(200).json({ message: "Logged in", token });
        } 
        else {
            return res.status(401).send("Invalid credentials");
        }
            // else res.redirect("/UserLogin")
      }) //comparing password

    
})

function isLoggedIn(req, res, next) {
    // console.log(req.cookies,"cookies")
    if (!req.cookies.token) {
      return res.status(401).send("You have to login first");
    }
    
    try {
      const data = jwt.verify(req.cookies.token, "shhhh");
      req.user = data;
      next();
    } catch (error) {
      return res.status(401).send("Invalid or expired token");
    }
  }                  // middleware


app.get("/UserDashboard", isLoggedIn ,async (req,res)=>{
    let user = await usermodel.findOne({email:req.user.email})
    // console.log(user)
    res.send(user)
   
})

app.get("/UserLogout", (req,res)=>{
    res.cookie("token","", { 
        httpOnly: true, 
        sameSite: "strict", 
        expires: new Date(0)  // Set expiration to past time to delete the cookie
    })
    res.status(200).send({ message: "Logged out successfully" });
})


// Admin
app.post("/AdminSignup", async (req,res)=>{
    const {name,email,password}= req.body
    console.log(req.body)

    let admin  = await adminmodel.findOne({email})
    if(admin) {
     return res.status(400).send("Admin already registered");
        
    }

    bcrypt.genSalt(10,(err,salt)=>{
        // console.log(salt)
        bcrypt.hash(password,salt, async (err,hash)=>{         // accepts something
            // console.log(hash)   hash is the password jo hume save krna h
         let admin =  new adminmodel({
               name,
               email,
                password:hash
            })
            await admin.save()
            let token =  jwt.sign({email:email},"shhhh");  //shhhh is secret key in real app we dont write like this
            console.log(token)
         res.cookie("Admintoken", token, {
            httpOnly: true, // Prevents client-side access
            
            sameSite: "strict", // Prevent CSRF attacks
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
          }) 
        //    console.log(a,"cookie")
            res.status(201).send("registered success")
        })
      })
})

app.post("/AdminLogin", async (req,res)=>{
    const {email,password}= req.body
    // console.log(req.body)

    let admin  = await adminmodel.findOne({email})
    if(!admin) {
    return res.status(400).send("Admin not registered");
        
    }
    bcrypt.compare(password,admin.password, (err,result)=>{
        if(result) {
          
            let token =  jwt.sign({email:email},"shhhh");  
             res.cookie("Admintoken",token, {
                httpOnly: true,
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
              })
            // console.log("Cookie Set:", token);
            return res.status(200).json({ message: "Logged in", token });
        } 
        else {
            return res.status(401).send("Invalid credentials");
        }
            // else res.redirect("/UserLogin")
      }) //comparing password  
})

function AdminIsLoggedIn(req, res, next) {
    // console.log(req.cookies,"cookies")
    if (!req.cookies.Admintoken) {
      return res.status(401).send("You have to login first");
    }
    
    try {
      const data = jwt.verify(req.cookies.Admintoken, "shhhh");
      req.admin = data;
      next();
    } catch (error) {
      return res.status(401).send("Invalid or expired token");
    }
  }    

app.get("/AdminDashboard", AdminIsLoggedIn ,async (req,res)=>{
    let admin = await adminmodel.findOne({email:req.admin.email})
    // console.log(user)
    res.send(admin)
   
})
app.get("/AdminLogout", (req,res)=>{
    res.cookie("Admintoken","", { 
        httpOnly: true, 
        sameSite: "strict", 
        expires: new Date(0)  // Set expiration to past time to delete the cookie
    })
    res.status(200).send({ message: "Logged out successfully" });
})



app.listen(8000,()=>{
    console.log("server started") 
})