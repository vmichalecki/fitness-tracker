const router = require("express").Router();
const Workout = require("../models/Workout.js")


router.get("/api/workouts", (req, res) => {
    Workout.find({}, (error, data) => {
        if (error) {
            res.send(error);
        } else {
            res.json(data);
        }
    });
});

router.post("/api/workouts", (req, res) => {
    Workout.create({}, (error, data) => {
        if (error) {
            res.send(error);
        } else {
            res.json(data);
        }

    });
});

router.put('/api/workouts/:id', ({ body, params }, res) => {
    Workout.findByIdAndUpdate(
        params.id,
        { $push: { exercises: body } },
        // "runValidators" will ensure new exercises meet our schema requirements
        { new: true, runValidators: true }
    )
        .then((dbWorkout) => {
            res.json(dbWorkout);
        })
        .catch((err) => {
            res.json(err);
        });
});

router.get("/api/workouts/range", (req, res) => {
    Workout.aggregate([
        { $addFields: { totalDuration: { $sum: `$exercises.duration` } } },
    ])
        .sort({ _id: -1 })
        .limit(7)
        .then((workouts) => {
            res.json(workouts);
        })
        .catch((err) => res.json(err));
});

module.exports = router;



// you will have a lot of routes - you can break them into a separate routes folder if you want

// need to have the public static thing

// VIEWS /////////////////////////////////////
// this is a good place to start - just get the buttons working to link up the HTML pages
// router.get('/exercise') --> exercise.html
// router.get('/stats') --> stats.html

// API ROUTES ///////////////////////////////
// look at the front end api.js in the public folder and write the back end code to match the front end requests

// router.post('/api/workouts') --> create a new workout
// workout.create({})

// router.put('/api/workouts/:id') - find the workouts and push exercises into an array
// you're not creating new exercises, youre pushing an exercise into array of workout above

// router.get('/api/workouts') - get all workouts

// router.get('/api/workouts/range') - last 7 combined weights, last 7 combined duration