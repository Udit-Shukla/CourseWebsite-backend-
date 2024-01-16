const jwt=require('jsonwebtoken');

exports.authenticateJwt=(req,res,next)=>{
    try {
        const authHeader=req.headers.authorization;
        const token=authHeader.split(' ')[1];

        //checking if token exists
        if(!token)
            return res.status(400).json({
                success:false,
                message:"Token not found"
            });
        
        //verifying token
        const verified = jwt.verify(token,process.env.JWT_SECRET);
        
        if(!verified)
            return res.status(401).json({
                success:false,
                message:"Token verification failed"
            });
        
        //adding user to request body
        req.user=verified.user;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Something went wrong while authenticating user"
        })
    }
};

