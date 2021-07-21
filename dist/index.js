"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : {"default": mod};
};
Object.defineProperty(exports, "__esModule", {value: true});
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes/routes"));
const dbConnect_1 = require("./db/dbConnect");
const app = express_1.default();
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
}));
app.get('/', (req, res) => {
    res.send('Testing...!');
});
app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
    dbConnect_1.DbConnect.initialize().catch(console.error);
    routes_1.default(app);
});
