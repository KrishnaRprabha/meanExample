const express = require('express');
const session = require('express-session');
const dataService = require('./services/data.service')
const app = express();

app.use(session({
    secret:"secretkeyforsession",
    resave:false,
    saveUninitialized:false
}));
const authMiddleware = (req,res,next)=>{
    console.log(req.session)
    if(!req.session.currentUser){
        res.json({
            status: false,
            message:'Unauthorised Access, please login' 
         })
    
    }else{
        next();
    }
}

app.use(express.json());
const port = 3000;

app.get('/',(req,res)=>{
    res.send("Ok")
})

app.post('/register',(req,res)=>{
    //const result = dataService.register(req.body.username, req.body.email, req.body.password)
    //res.send(result.message)
    //res.json(result)
    dataService.register(req.body.username, req.body.email, req.body.password).then(result=>{
        res.json(result)
    })
    
})
app.post('/login',(req,res)=>{
    /* const result = dataService.login(req,req.body.username,req.body.password)
    res.json(result)
    console.log(req.session.currentUser) */
    dataService.login(req,req.body.username,req.body.password).then(result=>{
        res.json(result)
    })
})
app.get('/home',authMiddleware,(req,res)=>{
    const result = dataService.goHome(req)
    res.json(result)
})

app.listen(port,()=>{
    console.log(`App running on port ${port}`)
})