const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

//Retrieve all properties
//CRUD OPERATION: READ
exports.get_all_properties = (req, res, next) => {
    return res.status(200).json({
        message: 'Route working'
    });
}

/*
exports.get_single_property = (req, res, next) => {
    
}

exports.remove_property = (req, res, next) => {

}

exports.update_property = (req, res, next) => {

}*/