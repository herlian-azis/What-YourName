const express = require("express")
const app = express()
const PORT = process.env.PORT ||3000
const router = require('./routes')

app
    .use(express.json())
    .use(express.urlencoded({extended:true}))
    .get('/',(req,res)=>{
         res.send('sek')})
    // .get('/', (req, res) =>{
    //     res.send('hello world')
    //   })
    .use(router)


    .listen(PORT,()=>{
        console.log("app play port: " + PORT);
    })