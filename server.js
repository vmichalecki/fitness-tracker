const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutdb", { useNewUrlParser: true });

app.use(require("./models/Workout.js"))


// view
// router.get ('/exercise')
// router.get('/stats)

// api
// router.post('workouts') workout.create()

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`)
})