const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
     const token = req.header('token');
     //console.log(token);
    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
       // console.log(verified);
        next();
    }catch(error){
         res.status(403).json(error)
    }
};

const accountAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.id === req.params.id || req.user.isAdmin ){
            next();
        }
        else{
            res.status(403).json("You do not have the required permission")
        }
    })
}

const adminAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.isAdmin){
            next();
        }
        else{
            res.status(403).json("You do not have the required permission")
        }
    })
}

module.exports = {verifyToken, adminAuthorization, accountAuthorization};