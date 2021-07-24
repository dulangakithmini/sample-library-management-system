import jwt, {JwtPayload} from "jsonwebtoken";

export let decodeToken = (request: any): JwtPayload => {
    const token = request.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "secret");
    request.userData = decoded;
    return request.userData;
}