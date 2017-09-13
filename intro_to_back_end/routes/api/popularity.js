// Async module for function flow and control
const async   = require("async");

// MongoDB model for students
const Student = require("../../models/student.js");

/**
 * @api {post} /:netid Get the popularity of the student whose netid is netid
 * @apiName GetPopularity
 * @apiGroup Index
 *
 * @apiParam {String} netid The netid of the student
 *
 * @apiSuccess {Number} popularity The popularity of the student
 *
 * @req {Object} Express Request object
 * @res {Object} Express Response object
 */
module.exports = (req, res) => {
    console.log(`Received a popularity request for ${req.params.netid}`);
    
    // async.waterfall will run all functions in the array in sequence
    // To call the next function, run callback() with null as the first parameter
    // If anything is passed to the first parameter of callback(), it is treated as an error
    // And no other function will run. Instead, the "complete" function will run, with the first
    // parameter (err) being equal to the first error returned by any of the below functions.
    async.waterfall([
        (callback) => {
            // Query the student and execute our callback function when it completes
            Student.findOne({netid: req.params.netid}).exec(callback);
        },
        (student, callback) => {
            // If there is not a student of this NetID, we need to make one
            if (!student) {
                student = new Student({
                    netid:           req.params.netid,
                    popularityCount: 0
                });
            }
            // Student just got more popular!
            student.popularityCount++;
            // Save the student's information to Mongo
            student.save((err) => {
                // Pass any error, and the student, to our callback function
                return callback(err, student);
            });
        }
    ], (err, student) => {
        // If there was an error, log it and tell the user there was an error
        if (err) {
            console.error(err);
            return res.status(500).send("An internal error occurred");
        }
        // If not, give the user the popularity count
        else {
            return res.status(200).send({ popularity : student });
        }
    });
};
