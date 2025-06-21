import express, { Application, Request, Response } from "express";


const app: Application = express();
// Middleware
app.use(express.json())

app.get("/", (req: Request, res: Response) => {
    res.send('Welcome to Library Management app')
})

export default app;