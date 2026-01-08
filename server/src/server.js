require("dotenv").config();

const express = require("express");
const app = express();
const methodOverride = require("method-override");


app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.json());


const cors = require("cors"); // To resolve cors error caused by react dev server (frontend) talking to node server (backend)
app.use(cors({
    origin: "http://localhost:5173"
}));




const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI)
    .then((succ) => {
        console.log("Connected to DB!");
    })
    .catch((err) => {
        console.log("Could not connect to DB");
    })



const noteRoutes = require("./routes/notes.js");
app.use("/api/notes", noteRoutes);



//Error Handling Middlewares 
const ExpressError = require("./utils/ExpressError.js");
app.all(/(.*)/, (req, res, next) => {
    next(new ExpressError(404, "Page not found"));
})
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    res.status(status).json({
        success: false,
        error: {
            status: status,
            message: message
        }
    })
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening from PORT ${process.env.PORT}`);
})