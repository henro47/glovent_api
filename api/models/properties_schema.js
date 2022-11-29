const mongoose = require('mongoose');

const properties_schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    stand_number: { type: String, required: true, unique: true },
    property_number: { type: String, required: true, unique: true },
    address: {

        street_no: { type: String },
        street_name: { type: String },
        suburb: { type: String },
        city: { type: String },
        postal_code: { type: String }

    },
    GPS_lat_lng:
    {
        lat: { type: Number },
        lng: { type: Number }
    },
    stand_size: { type: Number },
    building_size: { type: Number },
    photo_url: { type: String },
    created_at: { type: Date },
    updated_at: { type: Date },
    deleted_at: { type: Date }
});

module.exports = mongoose.model('Property', properties_schema);