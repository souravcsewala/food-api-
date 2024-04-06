const express=require("express");
const {Tokencheakmidileware}=require("../middleware/authmiddleware")

const {userinfo,userUpdate,userpasswordupdate,deleteuser}=require("../controllers/useDetaillscon")


    const Router=express.Router();
    // get user details || get
   Router.route("/get-user-info").get(Tokencheakmidileware,userinfo)
    // user details update || post
   Router.route("/lets-user-update").put(Tokencheakmidileware,userUpdate)
   // user password update || post
   Router.route("/lets-user-password-update").put(Tokencheakmidileware,userpasswordupdate)
   // user delete || DELET 
   Router.delete("/deleteuser", Tokencheakmidileware, deleteuser);



         module.exports=Router;