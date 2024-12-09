const express = require('express')
const app = express();


app.use("/",(req,res)=>{
    res.send("Hello")
})


app.listen(3000,(err,res)=>{
    if(err){
        console.log('Error while installing the server')
        return;

    }
    console.log("Server is up and runing")
})