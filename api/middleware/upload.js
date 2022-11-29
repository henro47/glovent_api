const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../assets/'))
    },
    filename: function (req, file, cb) {
        let file_ext = file.originalname.split('.');
        cb(null, file.fieldname + '_' + Date.now() +'.'+file_ext[1]);
    }
});

const upload = multer({ storage: storage });

module.exports = upload;