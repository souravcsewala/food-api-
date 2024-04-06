  const mongoose=require("mongoose");


      const orderSchema=new mongoose.Schema({
        foods: [{ type: mongoose.Schema.Types.ObjectId, ref: "food" }],
        payment: {},
        buyer: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        status: {
          type: String,
          enum: ["preparing", "prepare", "on the way", "deliverd"],
          default: "preparing",
        },
      },
          {timestamps:true}
      )

          const orderModel=new mongoose.model("order",orderSchema)

            module.exports=orderModel