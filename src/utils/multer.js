const multer  = require('multer');
const crypto  = require('crypto');
const { extname, resolve} = require('path');


const fileFilter = (req, file, cb) => {
    const isAccepted = ['image/png', 'image/jpg', 'image/jpeg']
    .find(acceptedFormat => acceptedFormat == file.mimetype)

    if(isAccepted){
        return cb(null, true)
    }

    return cb(null, false);
}   

module.exports = multer({
    storage: multer.diskStorage({ 
        destination: resolve(__dirname , '..', '..', 'tmp', 'uploads', 'imgpodcast'),
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, resp) => {
                if(err) return cb(err);

                return cb(null, `${Date.now().toString()}-` + resp.toString('hex') + extname(file.originalname));
            });
        },
    }),
    fileFilter
});