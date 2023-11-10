const express =require("express")
const router =express.Router();
const usercontroller = require("../controller/usercontroller")
const productcontroller = require("../controller/productcontroller")
const {loginauth,adminauth} =require("../middleware/auth")
const upload = require("../middleware/photoupload")

router.post("/register",usercontroller.register)
router.post("/login",usercontroller.login)
router.get("/loginverify",loginauth,(req,res)=>{
    res.send({ok:"User verify successfully"})
})

router.get("/adminverify",loginauth,adminauth,(req,res)=>{
    res.send({ok:"User verify successfully"})
})
router.post("/addproduct", upload.single("img"),loginauth,adminauth,productcontroller.addproduct)
router.get("/allproduct",productcontroller.Allproduct)
router.get("/product",productcontroller.Product)
router.get("/product/:id",productcontroller.singleproduct)
router.put("/editproduct/:id",loginauth,adminauth,upload.single("img"),productcontroller.editproduct)
router.delete("/deleteproduct/:id",productcontroller.deleteproduct)



module.exports =router;