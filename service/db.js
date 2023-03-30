const mongoose=require('mongoose')

//state connection string
mongoose.connect('mongodb://localhost:27017/bankServer',{useNewUrlParser:true})

//model(schema) creation(model name must be singular of collection name and first letter capital)
//schema means keys nd values

const User=mongoose.model('User',{
    acno:Number,
    username:String,
    password:String,
    balance:Number,
    transaction:[]
})



module.exports={
    User
}

