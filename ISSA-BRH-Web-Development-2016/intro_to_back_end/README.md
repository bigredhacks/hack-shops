# ISSA-BigRed//Hacks Hack Shops
# Intro to Back-End Web Development
## Making a Cornell Popularity API with Node.js and Mongoose

In this workshop, you're going to learn how to create an API using Node.js, express, and Mongoose.  We'll be making the back-end for a popularity site that lets you find out how popular you are by your netid!

## Prerequisites
You're going to need to install [Node.js](https://nodejs.org/en/), [MongoDB](https://www.mongodb.com), [git bash](https://git-scm.com/), and [Advanced Rest Client](https://chrome.google.com/webstore/detail/advanced-rest-client/hgmloofddffdnphfgcellkdfbfbjeloo?hl=en-US) (or equivalent).

* Node.js is a javascript runtime that will act as our server.
* MongoDB is a schemaless, key-value database.
* Git is an industry standard distributed version control system.
* ARC (Advanced Rest Client) is a convenient chrome extension for making calls to your API

## The Server
All of the code for this is available within this repository under the popularity_api folder.

Assuming you have set up Node.js and gotten mongo running, it is time to create the app. Node.js comes with a package manager, `npm`, which provides some utilities to initialize and run a project, in addition to installing packages (libraries) that can be referenced within your app.

In a terminal window within the folder in which you want to create your app, type

    npm init

and follow the instructions to create your `package.json` file. This file is the project definition, mostly containing dependencies.

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
     * @api {get} /popularity/:netid Get the popularity of the student whose netid is netid
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

So we have an API that does nothing that the naked eye can detect!  Okay.  Let's make it count how many times a net id has been looked up and see who's really popular at Cornell!

To do that, we need to start using mongoose:

    // From the ISSA-BigRed//Hacks Intro to Web Dev Hack-Shop
    // Created by Trevor Edwards and Matt Hsu 2016
    // Licensed under the MIT License
    
    // Modules
    var express = require('express');
    var mongoose = require('mongoose');
    
    // Initialize express
    var app = express();
    
    // Connect mongoose
    mongoose.connect('mongodb://localhost/popularity_api');
    
    // Mongoose student Model
    var Student = mongoose.model('Student', 
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
                    console.error(err)
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

Also note that we have switched from a GET request to a POST request. Can you guess why?

## Testing it out

Unfortunately, we are honest developers who do not want to violate RESTful API standards, so our requests must be POST requests in order to view what we did.

This means that it's time to use ARC. You can query the API by opening ARC, selecting the POST option, and sending a request to localhost:3000.

You should hopefully see a response object of your popularity each time you make this request!

## ???/Profit

So after all of that, you do in fact have a server that will increment numbers based on the amount of times you make post requests. It's not a lot, but it's a start.

One thing we have not covered in this is deploying your server to the web. There are plenty of services for this including OpenShift, Heroku, AWS, Azure, and GCE, and they have very user-friendly guides for getting your Node.Js code onto their platforms.

Hopefully, this has given you enough to work on something you're truly excited about at BigRed//Hacks! If you need some ideas, try [making an API](https://github.com/TrevorEdwards/RedEvents) [for Cornell students!](https://github.com/mrkev/redapi) or just presenting some of your favorite data for the world to see!
