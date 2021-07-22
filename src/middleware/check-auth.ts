import jwt from 'jsonwebtoken';

let verifyToken = (req: any, res: any, next: any) => {
    try {
        const decoded = jwt.verify(req.body.token, "secret");
        req.userData = decoded;
        next();
    } catch (error) {
        res.send('Auth failed');
    }
}

export default verifyToken;