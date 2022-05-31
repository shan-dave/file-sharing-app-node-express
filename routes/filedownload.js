const Router = require('express').Router();
const Files = require('../models/files')

Router.get("/:uuid", async (req, res) => {
    try {
        const file = await Files.findOne({uuid: req.params.uuid})
        if(!file) {
            return res.status(404).json({error: "File Nof Found!!!"})
        }
        const filePath = `${__dirname}/../${file.path}`
        console.log("--------------", filePath)
        res.download(filePath)
    } catch(err) {
        return res.json({error: err.message})
    }
})
module.exports = Router