import express from 'express';
import routes from "./routes/routes";
import {DbConnect} from "./db/dbConnect";

const app = express();

app.get('/', (req, res) => {
    res.send('Testing...!');
})

app.listen(3001, () => {
    console.log('The application is listening on port 3001!');

    DbConnect.initialize().catch(console.error);
    routes(app);
});