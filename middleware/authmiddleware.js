const JWT = require("jsonwebtoken");
const user=require('../models/userModel');

const Tokencheakmidileware = async (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");
        if (!authHeader) {
            return res.status(404).send({
                message: "Token not found",
                success: false
            });
        }

        const token = authHeader.replace("Bearer", "").trim();
        console.log("without Bearer",token);

        if (!token) {
            return res.status(404).send({
                message: "Token not found",
                success: false
            });
        }

        const decoded = await JWT.verify(token, process.env.JWT_TOKEN_KEY);

        console.log("after Token verified:", decoded);

           console.log("after token verified we get id",decoded._id)

               req.userid=decoded._id;
       
        next();
    } catch (error) {
        console.log(error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).send({
                message: "Invalid token",
                success: false
            });
        }
     
    }
};

module.exports = { Tokencheakmidileware };
