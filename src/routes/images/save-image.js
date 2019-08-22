
const fs = require('fs');
const path = require('path');
const users = require('../users/users');
const writeFile = fs.promises.writeFile;
const multer = require('multer');
const uploadFolder = multer({ dest: '../../db/images/' })


const saveImageFile = (file, user) => {
    const extArray = file.mimetype.split('/');
    const ext = extArray[extArray.length - 1];
    const newFileName = user.username;

    // return writeFile(imagesFolder, file)

}

const saveImage = (req, res) => {

    // uploadFolder.single('file')(req, res, function (err) {
    //     if (err instanceof multer.MulterError) {
    //         // A Multer error occurred when uploading.
    //         res.status(403)
    //         res.json({ status: 'Something wrong. Multer-type Error' });
    //     } else if (err) {
    //         // An unknown error occurred when uploading.
    //         res.status(403)
    //         res.json({ status: 'Something wrong while uploading. Unknown Error' });
    //     }

        const file = req.file;
        const userId = Number(req.body.id);
        const user = users.find(obj => obj.id === userId);

        saveImageFile(file, user)
        // .then(() => {
            res.json({
                status: `was saved in: user-${userId}`,
                user: user,
                file: file
            })
        // })
    // })


}

module.exports = saveImage