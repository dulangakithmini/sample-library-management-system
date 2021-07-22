import jwt from "jsonwebtoken";

let verifyRole = (req: any, res: any, next: any) => {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "secret");
    req.userData = decoded;

    if (req.userData.role !== "admin") {
        return res.send('Not allowed');
    }
    next();
}

export default verifyRole;