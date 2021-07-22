let verifyRole = (role: String) => {
    return (req: any, res: any, next: any) => {
        if (req.user.role !== role) {
            return res.send('Not allowed');
        }
        next();
    }
}

export default verifyRole;