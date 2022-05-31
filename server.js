const express = require('express')
const app = express();
const dbConnection = require('./config/db')
const PORT = process.env.PORT || 3001
const files = require('./routes/files')
const filesList = require('./routes/fileslist')
const fileDownload = require('./routes/filedownload')

//Database Connection
dbConnection();
app.use(express.json())
app.use('/api/files', files)
app.use('/files', filesList)
app.use('/files/download/', fileDownload)
app.listen(3001, () => {
    console.log('listing on port 3001');
})