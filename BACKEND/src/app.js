import express from 'express';
import mongoose from 'mongoose';
import { connectToSocket } from "./controllers/socketManager.js";
import { createServer} from "node:http";
import cors from "cors";
import userRoutes from "./routes/usersRoutes.js"

const app = express();
const server = createServer(app);
const io = connectToSocket(server);


// Middleware
app.use(cors());
app.use(express.json({ limit: "40kb"}));
app.use(express.urlencoded({ limit: "40kb", extended: true}));

app.get('/home', (req, res) => {
  res.send('Hello World');
});

// routes
app.use("/api/v1/users", userRoutes);




const start = async () => {
    app.set("mongo_user")
    const connectionDB = await mongoose.connect(
    "mongodb+srv://om313989:qmEz3fLGr3IlQ3dC@zoom.2bxjovl.mongodb.net/"
  );

  console.log(`mongo connected to DB Host ${connectionDB.connection.host}`);


  server.listen(3000, () => {
    console.log("port 3000");
  })

};

start();