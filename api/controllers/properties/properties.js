const Property = require('../../models/properties_schema');
const mongoose = require('mongoose');

exports.create_property = (req, res, next) => {
    console.log(req.file, req.body);
    const property = new Property({
        _id: new mongoose.Types.ObjectId(),
        stand_number: req.body.stand_number,
        property_number: req.body.property_number,
        address: req.body.address,
        photo_url: req.file.path,
        address: req.body.address,
        created_at: Date.now()
    });

    property.save()
    .then((result)=>{
        console.log(result);
        return res.status(201).json({
            message: 'Property created'
        });
    })
    .catch((err)=>{
        console.log(err);
        return res.status(500).json({
            error: err
        });
    });
}

//Retrieve all properties
//CRUD OPERATION: READ
exports.get_all_properties = (req, res, next) => {
    Property.find()
        .select('_id stand_number property_number address GPS_lat_lng photo_url created_at updated_at deleted_at')
        .exec()
        .then((docs) => {
            const response = {
                count: docs.length,
                properties: docs.map(doc => {
                    return {
                        _id: doc._id,
                        stand_number: doc.stand_number,
                        property_number: doc.property_number,
                        address: doc.address,
                        GPS_lat_lng: doc.GPS_lat_lng,
                        photo_url: doc.photo_url,
                        created_at: doc.created_at,
                        updated_at: doc.updated_at,
                        deleted_at: doc.deleted_at
                    }
                })
            };

            return res.status(200).json(response);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({
                error: err
            });
        });
}

//Retrieve single property's info
//CRUD OPERATION: READ
exports.get_single_property = (req, res, next) => {
    Property.find({ _id: req.params.id })
        .select('_id stand_number property_number address GPS_lat_lng photo_url created_at updated_at deleted_at')
        .exec()
        .then((doc) => {
            if (doc) {
                return res.status(200).json({
                    property: doc
                });
            }
            else {
                return res.status(404).json({
                    error: 'Not Found'
                });
            }
        })
        .catch((err) => {
            return res.status(500).json({
                error: err
            });
        });
}

exports.update_property = (req, res, next) => {
    const id = req.params.id;
    const updateOps = {};

    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    User.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            return res.status(200).json({
                message: 'Property updated',
            });
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({
                error: err
            });
        });
}

exports.remove_property = (req, res, next) => {
    const id = req.params.id;
    Property.remove({ _id: id })
        .exec()
        .then((result) => {
            return res.status(200).json({
                message: 'Property removed'
            });
        })
        .catch((err) => {
            return res.status(500).json({
                error: err
            });
        });
}