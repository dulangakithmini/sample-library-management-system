import {decodeToken} from "../utils/decode-token";

let verifyToken = (req: any, res: any, next: any) => {
    try {
        decodeToken(req);
        next();
    } catch (error) {
        res.send('Auth failed');
    }
}

export default verifyToken;