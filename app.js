const express=require('express')
const body_parser=require('body-parser')
const ejs=require('ejs')
const mongoose=require('mongoose')

const app=express()
app.use(body_parser.urlencoded({extended:true}))
app.use(express.static('public'))
app.set('view engine','ejs')

const url="mongodb+srv://sahil_Dobhada:sahil30102001@cluster0.nnqiyhy.mongodb.net/persondata?retryWrites=true&w=majority"

mongoose.connect(url);
const schema=mongoose.Schema({
    email:{
        type:String,
        require:[true,"enter your email"]
    },
    password:{
        type:String
    }
})
const person=mongoose.model('persondata',schema)

app.get('/',function(req,res){
    res.render('home')
})

app.get('/login',function(req,res){
    res.render('login')
})
app.get('/register',function(req,res){
    res.render('register')
})
app.post('/register',async function(req,res){
    const email=req.body.username;
    const password=req.body.password;
    const p1=new person({
        email:email,
        password:password
    })
    const p=await person.findOne({email:email}).exec()
    if(!p){
        p1.save();
        res.render('secrets')
    }else{
        res.render('/register')
    }
    
})
app.post('/login',async function(req,res){
    const email=req.body.username;
    const password=req.body.password
    const p=await person.findOne({email:email}).exec()
    if(!p){
        res.render('login')
    }else{
        if(p.password==password){
            res.render('secrets')
        }else{
            res.send('<h1>Enter correct password</h1>')
        }
    }
})





app.listen(process.env.PORT || 3000)