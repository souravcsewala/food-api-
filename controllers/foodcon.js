const foodModel= require("../models/foodModel");
const orderModel=require("../models/orderModel");


    // create food
     const createFoodcontroller=async(req,res)=>{
            try{
              const  {title,
                description,
                price,
                imageUrl,
                foodTags,
                catgeory,
                code,
                isAvailabe,
                resturnat,
                rating} = req.body;
                if(!title || ! description || ! price || ! resturnat){
                      return res.status(404).send({
                        message:"provide all details",
                        success:false
                      })
                }
                   const newfood= new foodModel({
                    title,
                    description,
                    price,
                    imageUrl,
                    foodTags,
                    catgeory,
                    code,
                    isAvailabe,
                    resturnat,
                    rating
                   })
                   await newfood.save()
                   res.status(200).send({
                    message:"new food has created",
                    success:true,
                    newfood
                   })
            }catch(error){
                  console.log(error)

                  res.status(500).send({
                    message:"internal server problem",
                    success:false
                  })
            }
     }
          // get all foods 

          const GetAllFoods=async(req,res)=>{
               try{
                     const getproducts=await foodmodel.find({});
                           if(!getproducts){
                            return res.status(404).send({
                                  message:"not found",
                                  success:false
                            })
                           }
                             res.status(200).send({
                                message:"get all foods",
                                success:true,
                                getproducts
                             })
               }catch(error){
                   console.log(error);
                   res.status(500).send({
                    message:"internal problem",
                    success:false
                   })


               }
          }
          const getsinglefood=async(req,res)=>{
            try{
                    const {id} = req.params;
                       const foodsingle= await foodModel.findById(id);
                            if(!foodsingle){
                                return res.status(404).send({
                                   message:"not found",
                                   success:false
                                })
                            }
                               res.status(200).send({
                                   message:"the food details are:",
                                   success:true,
                                   foodsingle
                               })
            }catch(error){
               console.log(error)
               res.status(500).send({
                   message:"internal problem ",
                   success:false
               })
     

            }
      }

         // get food by resturant
            const getFoodByresturant=async(req,res)=>{
                   try{
                         const {resturantid} =req.params;
                              const foodbyresturant=await foodModel.find({ resturnat: resturantid });
                                  if(!foodbyresturant){
                                        return res.status(404).send({
                                            message:"not found cheak resturant id",
                                            success:false
                                        })
                                  }
                                        res.status(200).send({
                                              message:"this the details",
                                              success:true,
                                              foodbyresturant
                                        })
                   }catch(error){
                          console.log(error)
                          res.status(500).send({
                              message:"internal problem ",
                              success:false
                          })

                   }
                
            }
               // get food update 
                  const getFoodUpdate=async(req,res)=>{
                       try{
                             const {foodid}=req.params;
                               const {
                                title,
                                description,
                                price,
                                imageUrl,
                                foodTags,
                                catgeory,
                                code,
                                isAvailabe,
                                resturnat,
                                rating,
                               }=req.body;
                                 const updateFilieds=[];
                                 const foodupdateResult=await foodModel.findByIdAndUpdate(foodid,{
                                    title,
                                    description,
                                    price,
                                    imageUrl,
                                    foodTags,
                                    catgeory,
                                    code,
                                    isAvailabe,
                                    resturnat,
                                    rating,
                                 },
                                    {new:true}
                                 )
                                    if(!foodupdateResult){
                                         return res.status(404).send({
                                             message:"not found",
                                             success:false
                                         })
                                    }
                                    if(title) updateFilieds.push("title");
                                    if( description) updateFilieds.push("description");
                                    if(  price) updateFilieds.push("price");
                                    if(imageUrl) updateFilieds.push("imageUrl");
                                    if( foodTags) updateFilieds.push("foodTags");
                                    if( catgeory) updateFilieds.push("catgeory");
                                    if(  code) updateFilieds.push("code");
                                    if( isAvailabe) updateFilieds.push("isAvailabe");
                                    if(  resturnat) updateFilieds.push(" resturnat");
                                    if(   rating ) updateFilieds.push("  rating ");
                                    const updateMessage = updatedFields.length > 0 ? `${updatedFields.join(', ')} successfully updated` : 'No fields updated';
                                 res.status(200).send({
                                      message:updateMessage,
                                      success:true,
                                      foodupdateResult
                                 })
                       }catch(error){
                           console.log(error);
                           res.status(500).send({
                             message:"internal problem",
                             success:false
                           })
                       }
                  }
                   // food delete 
                    const GetFoodDelete=async(req,res)=>{
                              const{id}=req.params
                           try{
                            const foodremove=await foodModel.findByIdAndDelete(id)
                                if(!foodremove){
                                      return res.status(404).send({
                                        message:"not found",
                                        success:false
                                      })
                                }
                                res.status(200).send({
                                    message:"food delete",
                                    success:true
                                })
                           }catch(error){
                                 console.log(error)
                                 res.status(500).send({
                                    message:"internal problem",
                                    success:false
                                 })

                           }
                        
                    }
                      // placeoder 
               const placeorderFood=async(req,res)=>{
                  try{
                     const {cart}= req.body;
                     if (!cart) {
                          return res.status(404).send({
                            success: false,
                            message: "please food cart or payemnt method",
                          });
                        }
                        let total=0;
                        cart.forEach(item => { 
                           total += item.price;
                       });
                        const newOrder = new orderModel({
                          foods: cart,
                          payment: total,
                          buyer: req.userid,
                        });
                        await newOrder.save();
                        res.status(201).send({
                          success: true,
                          message: "Order Placed successfully",
                          newOrder,
                        });

                  }catch(error){
                    console.log(error)
                    res.status(500).send({
                        massage:"order place api fail",
                        success:false
                  })
           }
         }
           const orderChange= async (req,res)=>{
                 try{
                        const{oderid}=req.params;
                        const {newstatus}=req.body;
                            const statusupdate= await orderModel.findById(oderid);

                            if(!statusupdate){
                                res.status(404).send({
                                  message:"not found",
                                  status:false
                                })
                            }
                              if(!newstatus) {
                                   return res.status(404).send({
                                     message:"not found",
                                     status:false
                                   })
                              }  
                               const newstatusModel= new orderModel({
                                       status:newstatus
                               })
                                    await newstatusModel.save();
                                     res.status(200).send({
                                        message:"status update successfully",
                                        status:true,
                                        newstatusModel
                                     })
                 }catch(error){
                     console.log(error);
                     res.status(500).send({
                         message:"internal problem",
                         status:false
                     })
                 }
           }
                    
     module.exports={createFoodcontroller,getsinglefood,getFoodByresturant,getFoodUpdate,GetFoodDelete,GetFoodDelete,placeorderFood,orderChange}