var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PointsSchema = new Schema({
    points: {
        type: [[Number]],
        required: true
    },
    distance: {
        type: Number,
        required: true
    },
    created: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Points', PointsSchema);