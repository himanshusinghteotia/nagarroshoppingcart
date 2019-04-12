const express = require('express')
const srv = express();
const path = require('path')

srv.use(express.json())
srv.use(express.urlencoded({ extended: true }))
srv.use('/', express.static(path.join(__dirname, 'public')))
srv.use('/api', require('./routes/api').route)

const PORT=process.env.PORT || 2000

srv.listen(2000, () => console.log('Server started at ${PORT}'))