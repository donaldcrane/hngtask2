import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import Message from "./models/message";
import  messageValidation from "./validations/messageValidation";
import { connection } from "./config/database";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './public')));

// connect to MongoDB database
connection();

// Home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname,'./public/index.html'));
});

// send message
app.post('/send',async function(req,res, next){
    try {
        const {
            email, name, message, phone
        } = req.body;
        const { error } = messageValidation( req.body );
        if (error) return res.status(400).json({status:400, message: error.message});
        const newMessage = await Message.create({
            name, email,message, phone,
        });
        return res.status(200).json({ 
            status: 201,
            message : `Dear ${name}, Your message has been saved successfully`,
            newMessage
        });
    } catch (error) {
      next(error);
    }
});

app.all("*", (req, res) => {
  return res
    .status(404)
    .json({ message: "Requested does not exist", data: null });
});
console.log(process.env.PORT);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
export default app;
