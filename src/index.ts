import express from 'express';
import routes from "./routes/routes";

const app = express();

app.get('/', (req, res) => {
    res.send('Testing...!');
})

app.listen(3003, () => {
    console.log('The application is listening on port 3003!');

    routes(app);
});