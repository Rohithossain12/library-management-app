import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import dotenv from "dotenv";
dotenv.config();


let server: Server;
const PORT = 5000;

async function main() {

    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uv360.mongodb.net/library-management-app?retryWrites=true&w=majority&appName=Cluster0`);
        console.log("Connected to mongoDB Using Mongoose");
        server = app.listen(PORT, () => {
            console.log(`App is Listening on port ${PORT}`);
        })

    } catch (error) {
        console.log(error);
    }
}

main()