const express = require("express");
const testApi = require("../controllers/testcontrollers");

const router = express.Router();

router.route("/test-api").get(testApi);

module.exports = router;
