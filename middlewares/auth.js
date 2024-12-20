const admin = require('../firebase')
const User = require('../models/user')

exports.authCheck = async (req,res, next)=>{
    //console.log(req.headers)
    try{
        const firebseUser=await admin.auth().verifyIdToken(req.headers.authtoken)
        console.log('FIREBASE USER IN AUTHCHECK', firebseUser)
        req.user = firebseUser
        next()
    } catch(err){
        res.status(401).json({
            err: "Invalid or expired token",
        })
    }
    
}

exports.adminCheck=async(req,res,next)=>{
    const {email} = req.user
    const adminUser = await User.findOne({email}).exec()
    if(adminUser.role!=='admin'){
        res.status(403).json({
            err: "Admin resourse. Access denied.",
        })
    } else{
        next()
    }
}