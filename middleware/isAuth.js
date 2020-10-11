const JWT=require('jsonwebtoken');

module.exports=(req,res,next)=>{
    const authHeader =req.get('Authorization');
    if(!authHeader){
        const error = new Error('Not authenticated.');
        error.statusCode=401;
        throw error;
    }
    const token =authHeader.split(' ')[1];
    let decodedToken;
    try{
        decodedToken=JWT.verify(token,process.env.secretkey);
    }
    catch (err){
        if(!err.statusCode){
            err.statusCode=500;
            throw err;
        }
    }
    if(!decodedToken){
        const error = new Error('Not authenticated');
        error.statusCode=401;
        throw error;
    }
    req.userId=decodedToken.userId;
    next();
}