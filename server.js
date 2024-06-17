require("dotenv").config(); 
      const express=require("express");

         const PORT=process.env.PORT || 7003

         const app=express();
         const DatabaseConeect=require("./database/database")
         var colors=require("colors")
         
  const testRoute=require("./routes/testroute")
           // base Route
         app.get("/",(req,res)=>{
               res.send("<h1>hiii this is server from food-app-api</h1>")
         });
         //middliwares
         app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));
              // diffarent Routes call
         app.use("/api/food-app/sourav",testRoute);
         app.use("/api/food-app/sourav/entry",require("./routes/AuthRoute"))
         app.use("/api/food-app/sourav/info",require("./routes/userDetailsroute"))
         app.use("/api/food-app/sourav/category",require("./routes/categoryRoute"))
         app.use("/api/food-app/sourav/resturant",require("./routes/resturantRoute"))
         app.use("/api/food-app/sourav/foods",require("./routes/foodRoute"))
             const StartServer= ()=>{
                    try{
                          DatabaseConeect();
                        app.listen(PORT,()=>{
                              console.log(`server is running at the port number ${PORT}`.white.bgGreen)
                        })
               
                    }catch(error){
                         console.log("server error",error)
                    }
             }
                   StartServer()
        