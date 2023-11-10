const express =require("express")
const app =express();
require("dotenv").config();
require("./dbconn/connection")
const cors= require("cors")
process.env.NODE_ENV = 'development';

const router =require("./router/route")

const port =process.env.PORT;


app.use(cors());
app.use(express.json());
app.use(router)
app.use("/uploads",express.static("./uploads"))

app.listen(port,()=>{
    console.log(`server listening on port no:${port}`);
})