const Router = require('express').Router();
const Files = require('../models/files')

Router.get('/:uuid', async (req,res) => {
    try {
        const file = await Files.findOne({uuid: req.params.uuid})
        if(!file) {
            return res.status(404).json({error: "File Nof Found!!!"})
        }
        return res.status(200).json({
            uuid: file.uuid,
            filename: file.fileName,
            filesize: file.size,
            fileDownloadLink: `http"//localhost:3001/files/download/${file.uuid}`
        })
    } catch(err) {
        return res.json({error: err.message})
    }
})
module.exports = Router