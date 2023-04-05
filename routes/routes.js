const express = require("express")
const router = express.Router()
const auth = require("../middlewares/auth")
const get = require("../controller/get")
const createUser = require("../controller/createUser")
const getAllUsers = require("../controller/getAllUsers")
const getUser = require("../controller/getUser")
const updateUser = require("../controller/updateUser")
const deleteUser = require("../controller/deleteUser")
const login = require("../controller/login")
const createBooking = require("../controller/createBooking")
const historyUser = require("../controller/historyUser")
const updateBooking = require("../controller/updateBooking")
const cancelBooking = require("../controller/cancelBooking")
const createPayment = require("../controller/createPayment")
const resetPassword = require("../controller/resetPassword")
const forgetPassword = require("../controller/forgetPassword")
const nearestUser = require("../controller/nearestUser")
const restoreAccount = require("../controller/restoreAccount")

router.get("/", get)

router.post("/api/v1/register", createUser)

router.get("/api/v1/users",auth, getAllUsers)

router.get("/api/v1/user/:id",auth, getUser)

router.patch("/api/v1/update",auth, updateUser)

router.delete("/api/v1/delete/:id",auth, deleteUser)

router.post("/api/v1/login", login)

router.post("/api/v1/resetPassword", auth, resetPassword)

router.post("/api/v1/restoreAccount", restoreAccount)

router.post("/api/v1/forgetPassword", forgetPassword)

router.post("/api/v1/createBooking",auth, createBooking)

router.get("/api/v1/drivers/:id/nearest-user",auth, nearestUser)

router.get("/api/v1/history/user/:id", auth, historyUser)

router.patch("/api/v1/updateBooking/:id",auth, updateBooking)

router.delete("/api/v1/cancelBooking/:id",auth, cancelBooking)

router.post("/payment",auth, createPayment)

module.exports = router

