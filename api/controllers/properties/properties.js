const Property = require('../../models/properties_schema');
const mongoose = require('mongoose');
const fs = require('fs');

exports.create_property = (req, res, next) => {
    console.log(req.file, req.body);
    const property = new Property({
        _id: new mongoose.Types.ObjectId(),
        stand_number: req.body.stand_number,
        property_number: req.body.property_number,
        address: JSON.parse(req.body.address),
        GPS_lat_lng: JSON.parse(req.body.GPS_lat_lng),
        photo_url: req.file.path,
        stand_size: req.body.stand_size,
        building_size: req.body.building_size,
        created_at: Date.now()
    });
    console.log(property);
    property.save()
        .then((result) => {
            console.log(result);
            return res.status(201).json({
                message: 'Property created'
            });
        })
        .catch((err) => {
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
        .select('_id stand_number property_number address GPS_lat_lng photo_url stand_size building_size created_at updated_at deleted_at')
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
                        stand_size: doc.stand_size,
                        building_size: doc.building_size,
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
        .select('_id stand_number property_number address GPS_lat_lng photo_url stand_size building_size created_at updated_at deleted_at')
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
    let update_obj = {};
    console.log(req.body);
    let address = JSON.parse(req.body.address);
    let GPS_lat_lng = JSON.parse(req.body.GPS_lat_lng);

    if (req.body.property_number !== '') {
        update_obj.property_number = req.body.property_number;
    }

    if (req.body.stand_number != '') {
        update_obj.stand_number = req.body.stand_number;
    }

    if (address.street_no !== '') {
        update_obj.address = address;
    }

    if (GPS_lat_lng.lat !== '') {
        update_obj.GPS_lat_lng = GPS_lat_lng;
    }

    if (req.body.stand_size != '') {
        update_obj.stand_size = req.body.stand_size;
    }

    if (req.body.building_size != '') {
        update_obj.building_size = req.body.building_size;
    }

    if (req.file !== undefined) {
        update_obj.photo_url = req.file.path;
    }

    update_obj.updated_at = Date.now();
    console.log(update_obj);

    if (update_obj.photo_url !== undefined) {
        Property.findOne({ _id: id })
            .select('photo_url')
            .exec()
            .then((doc) => {
                const photo_url = doc.photo_url;
                fs.unlink(photo_url, (err) => {
                    if (!err) {
                        Property.updateOne({ _id: id }, { $set: update_obj })
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
                    else {
                        return res.status(500).json({
                            error: err
                        });
                    }
                });
            })
            .catch((err) => {
                return res.status(500).json({
                    error: err
                });
            });
    }
    else {
        Property.updateOne({ _id: id }, { $set: update_obj })
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

}

exports.remove_property = (req, res, next) => {
    const id = req.params.id;
    Property.findOne({ _id: id })
        .select('photo_url')
        .exec()
        .then((doc) => {
            const photo_url = doc.photo_url;
            fs.unlink(photo_url, (err) => {
                if (!err) {
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
                else {
                    return res.status(500).json({
                        error: err
                    });
                }
            });
        })
        .catch((err) => {
            return res.status(500).json({
                error: err
            });
        });
}