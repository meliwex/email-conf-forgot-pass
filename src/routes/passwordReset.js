const express = require("express");
const { sendPasswordReset, resetPassword } = require("../controllers/passwordReset")
const jwtPasswordReset = require("../utils/jwtPasswordReset")

const router = express.Router()


router.post("/password", sendPasswordReset);

router.patch("/:token", jwtPasswordReset.verifyToken, resetPassword); 



module.exports = router;