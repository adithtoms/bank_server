
//import dataservice file
const dataservice = require('./service/dataservice')
const jwt = require("jsonwebtoken")

// import express
const express = require("express")

//import cors
const cors=require("cors")

// create app using express

const app = express()

//connection string to frontend intregration
app.use(cors({origin:'http://localhost:4200'}))

//to parse json data from req body
app.use(express.json())

//middleware
const jwtMiddleware = (req, res, next) => {
    try {
        const token = req.headers['access_token']
        //verify token
        const data = jwt.verify(token, "supersecretkey123")
        console.log(data);
        next()
    }
    catch {
        res.status(422).json({
            statusCode:422,
            status:false,
            Message:'please login first'
        })

    }
}


//register-post
app.post('/register', (req, res) => {
     dataservice.register(req.body.acno, req.body.uname, req.body.psw).then(result=>{
        res.status(result.statusCode).json(result)
     })
    //convert object to json and send as response
  
    // if(result){
    //     res.send("registered")
    // } else{
    //     res.send("user already exists")
    // }
    // console.log(req.body);
    // res.send("successs")
})
app.post('/login', (req, res) => {
   dataservice.login(req.body.acno, req.body.psw).then(result=>{
    res.status(result.statusCode).json(result)
   })
    //convert object to json and send as response
   
})

app.post('/deposit', jwtMiddleware, (req, res) => {
    dataservice.deposit(req.body.acno, req.body.password, req.body.amount).then(result=>{
        res.status(result.statusCode).json(result)
    })
    //convert object to json and send as response
    
})
app.post('/withdraw', jwtMiddleware, (req, res) => {
     dataservice.withdraw(req.body.acno, req.body.password, req.body.amount).then(result=>{
        res.status(result.statusCode).json(result)
     })
    //convert object to json and send as response
    
})
app.post('/getTransaction', jwtMiddleware, (req, res) => {
    dataservice.getTransaction(req.body.acno).then(result=>{
        res.status(result.statusCode).json(result)
    })
    //convert object to json and send as response
    
})

app.delete('/delete/:acno', jwtMiddleware,(req,res)=>{
    dataservice.deleteAcc(req.params.acno).then(result=>{
        res.status(result.statusCode).json(result)
    })
})


//request
//  app.get('/',(req,res)=>{
//     res.send('Get Method..........')
//  })

//create port
app.listen(3000, () => { console.log("server started at port 3000"); })