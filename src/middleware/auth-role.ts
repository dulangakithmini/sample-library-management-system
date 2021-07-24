import {decodeToken} from "../utils/decode-token";

let verifyRole = (req: any, res: any, next: any) => {
    let userData = decodeToken(req);

    if (userData.role !== "admin") {
        return res.send('Not allowed');
    }
    next();
}

export default verifyRole;