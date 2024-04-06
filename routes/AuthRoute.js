    
       const express=require("express");

          const Router=express.Router();
          const {userRegister,loginUser}=require("../controllers/AuthController")

       Router.route("/user-register").post(userRegister);
        Router.route("/user-login").post(loginUser)  

         module.exports=Router;