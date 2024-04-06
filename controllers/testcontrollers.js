const testApi = async (req, res) => {
    try {
          res.status(200).send({
              status:"success",
              msg:"test Api work"
          })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "error",
            msg: "Internal server error"
        });
    }
};

module.exports = testApi;
