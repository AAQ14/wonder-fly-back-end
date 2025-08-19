const jwt = require('jsonwebtoken')

exports.generateTokenAndSetCookie = (res, userId) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })

    res.cookie("token", token, {
        httpOnly: true, // prevent XSS attacks
        secure: process.env.NODE_ENV === "production", //true only if we ra eon the production which is https
        sameSite : "strict", //prevents an attack called csrf
        maxAge: 15 * 24 * 60 * 60 * 1000 //15 days 
    })

    return token
}
