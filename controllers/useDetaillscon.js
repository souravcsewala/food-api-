const usermodel=require("../models/userModel");
const orderModel=require("../models/orderModel")
const bcrypt=require("bcrypt")
     // userdetails paua 
    const userinfo=async(req,res)=>{
          try{
                 const userdetails=await usermodel.findById({_id: req.userid})
                    if(!userdetails){
                        return res.status(404).send({
                               massege:"user not found",
                               status:"false"
                        })
                          

                    }
                    userdetails.password=undefined;
                    res.status(200).send({
                        success: true,
                        message: "User get Successfully",
                        userdetails,
                      }); 
          }catch(error){
             console.log(error)
              res.status(500).send({
                  success:"false",
                  message:"server error"
              })
          }
    }
       // user details update 
          const userUpdate=async(req,res)=>{
               try{
                     const finduser=await usermodel.findById({_id:req.userid})
                        
                       if(!finduser){
                            return res.status(404).send({
                                  massage:"user does not find",
                                  massage:false
                            })
                       }
                              
                           const{name,phone,address}=req.body
                           const updatedFields = [];
                              if(name){
                                    finduser.name=name;
                                    updatedFields.push('name')
                              }
                              if(phone){
                                    finduser.phone=phone;
                                    updatedFields.push('phone')
                              }
                                if(address){
                                     finduser.address=address;
                                     updatedFields.push('address')
                                }
                                await finduser.save();
                                     finduser.password=undefined
                                let successMessage = " ";
                                if (updatedFields.length > 0) {
                                    successMessage += `: ${updatedFields.join(', ')} successfully updated`;
                                }else{
                                    successMessage="User not updated anything"
                                }
                        
                                res.status(201).send({
                                     massage: successMessage,
                                     success:"true",
                                     finduser
                                })
               }catch(error){
                    res.status(500).send({
                        massege:"update Api fail",
                        success:"false"
                    })
               }
          }

          // user password update 
             const userpasswordupdate=async(req,res)=>{
                    try{
                       const userFetch=await usermodel.findById({_id:req.userid})

                              if(!userFetch){
                                    return req.status(404).send({
                                          massege:"user not found",
                                          success:false
                                    })
                              }
                              const{oldpassword,newpassword}=req.body
                              if(!oldpassword || !newpassword){
                                     return res.status(500).send({
                                          massage:"plz provide all details",
                                          success:false
                                     })
                              }
                              const passwordMatch=await bcrypt.compare(oldpassword,userFetch.password)
                                    if(!passwordMatch){
                                          return res.status(404).send({
                                                massage:"invalid old password",
                                                success:false
                                          })
                                    }
                                    var hashingRound=10;
                                    var salt=await bcrypt.genSalt(hashingRound);
                                     var hash_password=await bcrypt.hash(newpassword,salt)
                                      userFetch.password=hash_password;
                                      await userFetch.save()
                                      res.status(200).send({
                                           massage:"user passwor has been updated",
                                           success:true,
                                           userFetch
                                      })
                    }catch(error){
                        console.log(error)  
                        res.status(500).send({
                              massage:"internal server error",
                              success:false
                        })
                    }
             }

             // delete user 

             const deleteuser=async(req,res)=>{
                      try{
                        
                      const afterdelete=  await usermodel.findByIdAndDelete(req.userid)
                              

                           console.log(afterdelete)
                        return  res.status(200).send({
                              massege:"user profile delete successfully",
                              success:true
                          })
                  }catch(error){
                          console.log(error)
                          res.status(500).send({
                              massage:"user delete api fail",
                              success:false
                          })
                  }
             }
          
      module.exports={userinfo,userUpdate,userpasswordupdate,deleteuser}