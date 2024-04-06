
    const userModel=require("../models/userModel");

      
         const CheakAdmin=async(req,res,next)=>{
                 try{
                    const user = await userModel.findById(req.userid);
                    if (user.usertype !== "admin") {
                      return res.status(401).send({
                        success: false,
                        message: "Only Admin ACess ",
                      });
                    } else {
                      next();
                    }
                                 
                 }catch(error){
                       console.log(error);
                       res.status(500).send({
                         message:"internal problem ",
                         status:false
                       })
                 }
         }
            module.exports={CheakAdmin};