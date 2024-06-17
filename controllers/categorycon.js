
     const categorymodel=require("../models/categoryModel")

       // create category test 

         const categorycreate=async(req,res)=>{
                try{
                       const {tittle,imageUrl}=req.body;
                         if(!tittle){
                            return res.status(404).send(
                                {
                                    success:false,
                                    message:"plz provide all details"
                                }
                            )
                         }
                           const newCateGory= new categorymodel({tittle,imageUrl});
                               await newCateGory.save();
                                res.status(201).send({
                                    success:true,
                                    message:"new category has created"
                                })
                }catch(error){
                    console.log(error);
                    res.status(500).send({
                        success:false,
                        message:"create category api failed"
                    })

                }
         }

         //update category 
            const updateCategory=async(req,res)=>{
                   try{
                        const{id}=req.params;
                        const {tittle,imageUrl}=req.body;
                          const updatedFields=[]
                        const updateProduct= await categorymodel.findById({_id:id});
                            if(!updateProduct){
                                 return res.status(404).send({
                                     message:"category not found",
                                     success:false
                                 })
                            }
                              if(tittle){
                                 updateProduct.tittle=tittle;
                                 updatedFields.push("tittle")
                              }
                               if(imageUrl){
                                updateProduct.imageUrl=imageUrl;
                                updatedFields.push("imageUrl")
                               }
                            await updateProduct.save();
                            let successMessage="";
                              if(updatedFields.length>0){
                                  successMessage += `${updatedFields.join(" ,")} successfully updated`
                              }else{
                                    successMessage="nothing changed in category"
                              }
                                res.status(200).send({
                                      success:true,
                                      successMessage,
                                      updateProduct
                                })

                   }catch(error){
                         console.log(error);
                         res.status(500).send({
                            message:"api failed category update",
                            success:false
                         })
                   }
            }
            // get all categories
             const getCategory=async(req,res)=>{
                    try{
                       const result=await categorymodel.find({});
                            if(!result){
                                 return res.status(404).send({
                                     message:"not found"
                                 })
                            }
                              res.status(200).send({
                                 success:true,
                                 message:"there are all categories",
                                 result
                              })
                    }catch(error){
                         console.log(error)
                         res.status(500).send({
                              message:"get category api fail",
                              success:false
                         })
                    }
             }
             // delete category 
             const RemoveCategory=async(req,res)=>{
                try{
                      const {id}= req.params;
                        const productDelete= await categorymodel.findByIdAndDelete(id)
                           if(!productDelete){
                              return res.status(404).send({
                                message:"not found product "
                              })
                           }
                             res.status(200).send({
                                  message:"category successfully delete",
                                  success:true
                             })
                }catch(error){
                      console.log(error);
                      res.status(500).send({
                        message:"category remove api failed",
                        success:false
                      })
                }
            
            
             }
         module.exports={categorycreate,updateCategory,getCategory,RemoveCategory}