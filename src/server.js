const express = require('express')
const dotenv = require('dotenv').config()
const authRoutes = require("./routes/auth")
const emailConfirmRoutes = require("./routes/emailConfirm")
const passwordResetRoutes = require("./routes/passwordReset")
const connectDb = require("./utils/connectDb")

const app = express();

connectDb();

app.use(express.json())



app.use("/v1/auth", authRoutes)
app.use("/v1/confirmation", emailConfirmRoutes)
app.use("/v1/reset", passwordResetRoutes)


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening port: ${port}`))
