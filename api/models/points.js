var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PointsSchema = new Schema({
    points: {
        type: [{}],
        required: true
    },
    distance: {
        type: Number,
        required: true
    },
    measure: {
        type: String,
        required: true,
        default: 'km'
    },
    created: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Points', PointsSchema);