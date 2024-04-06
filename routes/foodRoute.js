
      const express=require("express");
    const{createFoodcontroller,getsinglefood,getFoodByresturant,getFoodUpdate,GetFoodDelete,placeorderFood,orderChange}=require("../controllers/foodcon")
   const{Tokencheakmidileware }=require("../middleware/authmiddleware");
     const{CheakAdmin}=require("../middleware/Adminmid")

const foodModel = require("../models/foodModel");

          const Router=express.Router();

          // create new food || post 
          Router.route("/create-food").post(Tokencheakmidileware,createFoodcontroller)
         // get all food || get 
           Router.route("/get-food/:id").get(Tokencheakmidileware,getsinglefood)
         // get food by resturant 
            Router.route("/get-food-by-resturant/:id").get(Tokencheakmidileware,getFoodByresturant)
        // update food item 
             Router.route("/update-food/:id").put(Tokencheakmidileware,getFoodUpdate)
             // food delete
             Router.route("/delete-food/:id").delete(Tokencheakmidileware,GetFoodDelete)
             // placeorder food
              Router.route("/pace-order-food").post(Tokencheakmidileware,placeorderFood);
              // order status change
              Router.route("/order-status/:id").post(Tokencheakmidileware,CheakAdmin,orderChange)

          module.exports=Router;






