const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const postRoutes  = require('./routes/postRoutes')
const authRoutes = require("./routes/authRoutes")

dotenv.config()

const PORT = process.env.PORT
const app = express()

// middlewares
app.use(cors())
app.use(express.json())


app.get('/',(req,res)=>{
    res.status(201).json({
        msg:"Hello aman"
    })
})

app.use('/post', postRoutes)
app.use('/auth', authRoutes)

const startServer = async () => {
    try {
        
//DB connection before running server
        await connectDB();

        app.listen(PORT, () => {
            console.log("✅ Server running");
        });
    } catch (error) {
        console.error("❌ Server failed to start");
        process.exit(1);
    }
};

startServer()