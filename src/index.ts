import express, {Request, Response} from 'express';
import routes from "./routes/routes";
import {DbConnect} from "./db/dbConnect";
import checkBookReturns from "./schedule-jobs/check-returns-schedule";

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.get('/', (req: Request, res: Response) => {
    res.send('Testing...!');
})

app.listen(3000, () => {
    console.log('The application is listening on port 3000!');

    DbConnect.initialize().catch(console.error);
    routes(app);

    checkBookReturns;

});
