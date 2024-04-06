
     const Usermodel=require("../models/userModel");
     const bcrypt=require("bcrypt");
     const token=require("jsonwebtoken");

     //userRegister Logic

     const userRegister=async(req,res)=>{
            try{
                 const {name,email,password,phone,address}=req.body;
                      console.log(req.body.name)
                 if(!name || !email || !password || !phone || !address){
                      return res.status(500).send({
                        success:false,
                        message:"please provide all fields"
                      })
                 }
                  const userExist=await Usermodel.findOne({email:email});
                    if(userExist){
                         return res.status(500).send({
                             success:false,
                             message:"mail id already exists provide alternative mail id"
                         })
                    }
                         // hasing pASsword 
                            var hashingRound=10;
                           var salt=await bcrypt.genSalt(hashingRound);
                            var hash_password=await bcrypt.hash(password,salt)

                    const user= await Usermodel.create({
                         name,
                         email,
                         password:hash_password,
                         phone,
                         address
                    })
                    res.status(201).send({
                        success:true,
                        msg:"user Register successfully",
                        user
                    })
            }catch(error){
                console.log(error)
                res.status(500).send({
                    success:false,
                    message:"User register Api false"
                })
            }
     }
        // loginlogic

            const loginUser=async(req,res)=>{
                   try{
                        const {email,password}=req.body;
                           const userValid=await Usermodel.findOne({email:email});
                                console.log("user details after login", userValid)
                                console.log("password cheak",userValid.password)
                                console.log("name cheak",userValid.name)
                                if(!userValid){
                                    return res.status(404).send({
                                        success: false,
                                        message: "User Not Found",
                                      });
                                }
                                const isMatch = await bcrypt.compare(password, userValid.password );
                                   if(!isMatch){
                                    return res.status(404).send({
                                        success: false,
                                        message: " invalid creditianls",
                                      });
                                   }
                                   const generateToken= token.sign(
                                         {
                                            _id:userValid._id,
                                            email:userValid.email
                                         },
                                         process.env.JWT_TOKEN_KEY,{
                                            expiresIn:"30d"
                                         }
                                   )
                                      res.status(200).send({
                                          success:true,
                                          message:"login successfully",
                                          generateToken,
                                          userValid
                                      })
                   }catch(error){
                       console.log(error)
                    res.status(500).send({
                        success:false,
                        message:"User login Api false"
                    })
                   }
            }
           
        module.exports={userRegister,loginUser}