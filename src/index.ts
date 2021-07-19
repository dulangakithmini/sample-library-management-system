import express, {Request, Response} from 'express';
import routes from "./routes/routes";
import {DbConnect} from "./db/dbConnect";

const app = express();

app.get('/', (req: Request, res: Response) => {
    res.send('Testing...!');
})

app.listen(3000, () => {
    console.log('The application is listening on port 3000!');

    DbConnect.initialize().catch(console.error);
    routes(app);
});