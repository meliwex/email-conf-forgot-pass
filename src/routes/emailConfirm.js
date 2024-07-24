const express = require("express");
const { sendEmailConfirmation, confirmEmail } = require("../controllers/emailConfirm")
const jwtAuth = require("../utils/jwtAuth")
const jwtEmail = require("../utils/jwtEmail")

const router = express.Router()


router.get("/email", jwtAuth.verifyToken, sendEmailConfirmation);

router.get("/:token", jwtAuth.verifyToken, jwtEmail.verifyToken, confirmEmail); 



module.exports = router;