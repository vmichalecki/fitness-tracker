const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// day: date
const ExerciseSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    type: {
        type: String,
        trim: true,
        required: "Exercise type is required."
    },
    name: {
        type: String,
        trim: true,
    },
    weight: {
        type: Number,
    },
    sets: {
        type: Number,
    },
    reps: {
        type: Number,
    },
    duration: {
        type: Number
    },
});

const Workout = mongoose.model("Workout", ExerciseSchema);

module.exports = Workout;