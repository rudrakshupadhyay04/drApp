import jwt from 'jsonwebtoken';

const isAuthenitcated = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.status(401).json({
            message: "You need to login first",
            success:false
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.id = decoded.id;
        next();
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
            success:false
        });
    }
}

export default isAuthenitcated;