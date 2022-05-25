
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import userRouter from "./routes/user.js";
import ticketRouter from "./routes/tickets.js";
import 'dotenv/config';
const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());
app.use("/users", userRouter);
app.use('/tickets',ticketRouter);


const pORT = process.env.PORT|| 8080;
const uri = process.env.URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(pORT, () => console.log(`Server Running on Port: http://localhost:${pORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

