# ISSA-BigRed//Hacks Hack Shops
# Intro to Back-End Web Development
## Making a Cornell Popularity API with Node.js and Mongoose

In this workshop, you're going to learn how to create and host an API using Node.js, express, and Mongoose.  We'll be making the back-end for a popularity site that lets you find out how popular you are by your netid!

## Prerequisites
You're going to need Node.js, MongoDB, git bash, and an OpenShift account.

## The Server
All of the code for this is available within this repository under the popularity_api folder.

Assuming you have set up Node.js and gotten mongo running, it is time to create the app.

In a terminal within the folder in which you want to create your app, type

    npm init

and follow the instructions to create your package.json file.

We're going to need the express and mongoose modules in order to easily deliver content and store data.  Execute the following command:

    npm install express mongoose --save

Now we're ready to start coding.

Open/Create index.js with your favorite text editor (we use WebStorm in BigRed//Hacks, but feel free to use vim.. or something else?)

Let's just set up an API route:

    // From the ISSA-BigRed//Hacks Intro to Web Dev Hack-Shop
    // Created by Trevor Edwards and Matt Hsu 2016
    // Licensed under the MIT License
    
    // Modules
    var express = require('express');
    var mongoose = require('mongoose');
    
    // Initialize express
    var app = express();
    
    /**
     * @api {get} /:netid Get the popularity of the student whose netid is netid
     * @apiName GetPopularity
     * @apiGroup Index
     *
     * @apiParam {String} netid The netid of the student
     *
     * @apiSuccess {Number} popularity The popularity of the student
     */
    app.get('/popularity/:netid', function (req, res, next) {
        /*
         * req = request made to the server
         * res = response to the request
         */
        console.log('Received a popularity request for ' + req.params.netid);
        return res.send(5);
    });
    
    // Initialize the server, listening on port 3000
    app.listen(3000, function() {
        console.log('Popularity API listening on port 3000');
    });


## Running Locally

Save your work and type node index.js in your terminal. Then open your browser to 

    http://localhost:3000/popularity/tre23
    
While you won't see anything on your browser, you should now see on your terminal that a request has been made!

## Adding in mongoose

So we have an API that does nothing!  Okay.  Let's make it count how many times a net id has been looked up and see who's really popular at Cornell!

To do that, we need to start using mongoose:


## ???/Profit
