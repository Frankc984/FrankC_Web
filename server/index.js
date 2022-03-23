const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs')

var app = express();

const port = 3001;

app.use(fileUpload({
    createParentPath: true,
    limits: {
        fileSize: 2 * 1024 * 1024 * 1024 //2MB max file(s) size
    }
}));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/upload', (req, res) => {
    console.log(req.files);
    try {
        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            let data = [];
            if (!Array.isArray(req.files.files_upload)) {
                let file = req.files.files_upload;
                console.log('one');

                if(fs.existsSync('./uploads/'+file.name)){
                    console.log('duplicado');
                }

                console.log('guardado ' + file.name);
                file.mv('./uploads/' + file.name);
                data.push({
                    name: file.name,
                    mimetype: file.mimetype,
                    size: file.size
                });
            } else {
                req.files.files_upload.forEach(photo => {
                    console.log('guardado ' + photo.name);
                    photo.mv('./uploads/' + photo.name);
                    data.push({
                        name: photo.name,
                        mimetype: photo.mimetype,
                        size: photo.size
                    });
                });
            }
            res.send({
                status: true,
                message: 'Files are uploaded',
                data: data
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});



app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});