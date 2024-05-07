const jwt = require("jsonwebtoken");
const key = 'Abhishek';

const fetchuser = (req, res, next)=>{
    //Get the user from jwt token and add id to req object.

    try{
        const token = req.header('auth-token');
        const data = jwt.verify(token, key);
        req.user = data.user;
        req.role = data.role;
        next();
    }catch(error){
        res.status(401).send({error: "Invalid Token."});
    };
};

module.exports = fetchuser;