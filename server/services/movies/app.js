const express = require("express")
const app = express()
const PORT = process.env.PORT ||3001
const router = require('./routes')

app
    .use(express.json())
    .use(express.urlencoded({extended:true}))
    .use('/',router)


    .listen(PORT,()=>{
        console.log("app play port: " + PORT);
    })