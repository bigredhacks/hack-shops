// From the ISSA-BigRed//Hacks Intro to Web Dev Hack-Shop
// Created by Trevor Edwards and Matt Hsu 2016
// Licensed under the MIT License

// Modules
const express = require('express');
const mongoose = require('mongoose');

// Initialize express
const app = express();

// Connect mongoose
mongoose.connect('mongodb://localhost/popularity_api');

// Mongoose student Model
let Student = mongoose.model('Student',
        new mongoose.Schema({
            netid: {type: String, required: true, index: true},
            popularityCount: {type: Number, default: 0}
        })
);

/**
 * @api {post} /:netid Get the popularity of the student whose netid is netid
 * @apiName GetPopularity
 * @apiGroup Index
 *
 * @apiParam {String} netid The netid of the student
 *
 * @apiSuccess {Number} popularity The popularity of the student
 */
app.post('/popularity/:netid', function (req, res, next) {
    /*
     * req = request made to the server
     * res = response to the request
     */
    console.log('Received a popularity request for ' + req.params.netid);

    // Query and update the popularity of the user
    Student.findOne( { netid : req.params.netid }, function (err, student) {
        if (err) {
            console.error(err);
            return res.status(500).send('An internal error occurred');
        }

        if (!student) {
            student = new Student({
                netid: req.params.netid,
                popularityCount: 0
            });
        }

        student.popularityCount++; // Student just got more popular!

        student.save(function(err) {
            if (err) {
                console.error(err);
                return res.status(500).send('An internal error occurred');
            }

            return res.status(200).send({ popularity : student.popularityCount });
        });
    });
});

// Initialize the server, listening on port 3000
app.listen(3000, function() {
    console.log('Popularity API listening on port 3000');
});
