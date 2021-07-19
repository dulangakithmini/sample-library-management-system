import {connect} from "mongoose";

export class DbConnect {
    static async initialize() {
        console.log('Starting Mongoose Application');

        const uri = "mongodb+srv://dulanga:dulanga@nodecluster.pmtdr.mongodb.net/libraryDb?retryWrites=true&w=majority";

        try {
            await connect(uri);
            console.log('Connection successful');
        } catch (e) {
            console.log('Connection error');
        }
    }
}