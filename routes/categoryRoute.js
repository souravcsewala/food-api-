
     const express=require("express");
         const { Tokencheakmidileware}=require("../middleware/authmiddleware")
        const{categorycreate,updateCategory,getCategory,RemoveCategory}=require("../controllers/categorycon")

          const Router=express.Router();

          // create category || post 
                Router.route("/create-category").post( Tokencheakmidileware,categorycreate)
          // update category || put
               Router.route("/update-category/:id").put(Tokencheakmidileware,updateCategory)
               // get category || get 
               Router.route("/get-category").get(Tokencheakmidileware,getCategory)
               // Delete category || delete
               Router.route("/delete-category/:id").delete(Tokencheakmidileware,RemoveCategory)
          module.exports=Router;
   

