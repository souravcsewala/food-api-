

    const mongoose=require("mongoose");
      
        const userSchema= new mongoose.Schema({
               name:{
                 type:String,
                 required:[true, "user name is required"]
               },
               email:{
                type:String,
                required:[true,"mail id is require"]
               },
               password:{
                type:String,
                required:[true,"password is require"]
               },
               phone:{
                type:String,
                required:[true,"phone number is require"]
               },
               usertype:{
                type:String,
                required:[true,'usertype is require'],
                default:"client",
                enum:["client","admin","vendor","deliveryboy"]
               },
               profile:{
                type:String,
          default:"https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png"      
               },
               address:{
                  type:Array,
               },
               answer:{
                type:String,
                required:[false,"answer is require"]
               },
            
        },
        { timestamps: true }
        )

        const Usermodel=new mongoose.model("user",userSchema) 


           module.exports=Usermodel;