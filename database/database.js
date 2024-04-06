
   const mongoose=require("mongoose");
     var colors=require("colors")
    
         const MONGOURI=process.env.MONGO_URL  
      const DatabaseConeect=async () =>{
          try{
                await mongoose.connect(MONGOURI)
                  console.log(`database is connect to ${mongoose.connection.host}`.blue.bgCyan)  
          }catch(error){
              console.log("database error",error)
          }
      }

         module.exports=DatabaseConeect;
