import express, { Application, Request, Response } from "express";
import { booksRouter } from "./app/controllers/book.controller";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import borrowRouter from "./app/controllers/borrow.controller";
import cors from "cors";


const app: Application = express();
// Middleware
app.use(express.json());

app.use(
  cors({
    origin: ['http://localhost:5173', 'https://library-management-client-rho.vercel.app']
   })
);


app.use("/api/books", booksRouter);
app.use("/api/borrow", borrowRouter);


app.get("/", (req: Request, res: Response) => {
  res.send('Welcome to Library Management app')
})


// 404 Not Found Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    error: {
      path: req.originalUrl,
      method: req.method,
    },
  });
});


// Global Error Handler
app.use(globalErrorHandler);





export default app;