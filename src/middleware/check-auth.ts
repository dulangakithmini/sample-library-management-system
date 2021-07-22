import jwt from 'jsonwebtoken';

let verifyToken = (req: any, res: any, next: any) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, "secret");
        req.userData = decoded;
        next();
    } catch (error) {
        res.send('Auth failed');
    }
}

export default verifyToken;