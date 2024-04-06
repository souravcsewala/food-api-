const mongoose=require("mongoose");

     const categorySchema= new mongoose.Schema({
           tittle:{
              type:String,
              required:[true,"category is required"]
           },
           imageUrl:{
              type:String,
              
              default:  "https://image.similarpng.com/very-thumbnail/2021/09/Good-food-logo-design-on-transparent-background-PNG.png",
           },

     },
           {timestamps:true}
        )
            const categoryModel=new mongoose.model("category",categorySchema);

                module.exports=categoryModel;