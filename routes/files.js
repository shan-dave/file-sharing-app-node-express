const Router = require('express').Router();
const multer = require('multer')
const path = require('path')
const Files = require('../models/files')
const {v4: uuid4 } = require('uuid')

let storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploades/'),
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName)
    }
})

let upload = multer({
    storage,
    limits: {fileSize: 1000000 * 100}
}).single('myfile')

Router.post('/', (req, res) => {
    upload(req, res, async err => {
        if(!req.file) {
            return res.json({error : "File Required!!!"})
        }
        if(err) {
            return res.status(500).send({ error: err.message })
        }

        const file = new Files({
            fileName : req.file.filename,
            uuid : uuid4(),
            size: req.file.size,
            path : req.file.path,
        })
        const response = await file.save(); 
        return res.json({file:`http"//localhost:3001/files/${response.uuid}`})
    })
})

Router.post('/sendmail', async (req, res) => {
    const {uuid, emailto, emailfrom} = req.body

    if(!uuid || !emailto || !emailfrom) {
        res.json({error: "all fields are required!"})
    }

    const file = await Files.findOne({uuid: uuid})
    if(!file) {
        return res.status(404).json({error: "File Nof Found!!!"})
    }

    file.sender = emailfrom
    file.reciver = emailto
    const response = await file.save();

    const sendMail = require('../services/emailService')
    const responseData = sendMail({
        from: emailfrom,
        to: emailto,
        subject: "Download File Link",
        text: `${emailfrom} Shared a file with you`,
        html: require('../services/emailTemplate')({
            emailFrom: emailfrom,
            downloadLink: `http://localhost:3001/files/download/${file.uuid}`,
            size: parseInt(file.size/1000)+' KB',
            expires: '24 Hours'
        })
    })
    if(responseData) {
        res.send({success:true})
    }
});
module.exports = Router