'use strict';
/*
 'use strict' is not required but helpful for turning syntactical errors into true errors in the program flow
 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
*/

/*
 Modules make it possible to import JavaScript files into your application.  Modules are imported
 using 'require' statements that give you a reference to the module.

  It is a good idea to list the modules that your application depends on in the package.json in the project root
 */
var util = require('util');
var Points = require('../models/points');

/*
 Once you 'require' a module you can reference the things that it exports.  These are defined in module.exports.

 For a controller in a127 (which this is) you should export the functions referenced in your Swagger document by name.

 Either:
  - The HTTP Verb of the corresponding operation (get, put, post, delete, etc)
  - Or the operationId associated with the operation in your Swagger document

  In the starter/skeleton project the 'get' operation on the '/hello' path has an operationId named 'hello'.  Here,
  we specify that in the exports of this module that 'hello' maps to the function named 'hello'
 */
module.exports = {
    list: getList,
    addPoint: addPoint
};

/*
  Functions in a127 controllers used for operations should take two parameters:

  Param 1: a handle to the request object
  Param 2: a handle to the response object
 */
function getList(req, res) {

    Points.find(function (err, data) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(200).json(data);
    }).sort('-created');
}


/**
 * { points: [{lat: 44.960278, lon: 34.114679}, {lat: 44.962123, lon: 34.120322}]} #490.18
 * @param req
 * @param res
 */
function addPoint(req, res) {


    var a = req.body.points[0];
    var b = req.body.points[1];

    var distance = getDistanceFromLatLonInKm(a.lat, a.lon, b.lat, b.lon);

    var newPoint = {
        points: req.body.points,
        distance: distance,
        measure: 'km'
    };

    Points.create(newPoint, function (err, content) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(200).json({
            "distance": content.distance,
            "measure": content.measure
        });
    });
}

function handleError(res, err) {
    return res.status(400).json(JSON.stringify(err));
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}

