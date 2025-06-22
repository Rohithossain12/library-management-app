import express, { Application, Request, Response } from "express";
import { booksRouter } from "./app/controllers/book.controller";


const app: Application = express();
// Middleware
app.use(express.json());


app.use("/api/books", booksRouter)


app.get("/", (req: Request, res: Response) => {
    res.send('Welcome to Library Management app')
})

export default app;