import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth/auth-routes.js";
import adminProductsRouter from './routes/admin/products-routes.js'
import shopProductsRouter from './routes/shop/productRoutes.js'

// create a database connection  -> you can also
// create a seperate file for this and then import/use that file in here

mongoose
  .connect(
    `mongodb+srv://kuntalabishek2002:TRgv8QxG29u7m29a@cluster0.t4jsn.mongodb.net/`
  )
  .then(() => console.log("Connected to database"))
  .catch((error) => console.log(error));

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter)
app.use("/api/shop/products", shopProductsRouter)

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () =>
  console.log(`Server is listening at http://localhost:${PORT}`)
);
