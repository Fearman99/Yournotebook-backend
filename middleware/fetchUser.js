const jwt = require("jsonwebtoken");
const JWT_SECRET = "MYBOI";

const fetchUser = (req,res,next)=>{
    const authtoken = req.header('auth-token');
    if(!authtoken){
        res.status(401).send({error : "enter a valid token"})
    }
    try{
    const data= jwt.verify(authtoken,JWT_SECRET);
    req.user = data.user;
    next();
    }
    catch(error){
        res.status(401).send({error : "enter a valid token"});
    }
}

module.exports =fetchUser