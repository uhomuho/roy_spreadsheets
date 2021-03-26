require('dotenv').config()

const express = require('express'),
			{ json, urlencoded } = require('body-parser'),
			helmet = require('helmet'),
			cors = require('cors')

const app = express()

app.use(json())
app.use(urlencoded({ extended: true }))

app.use(cors())
app.use(helmet())

app.get('/', (req, res) => {
	res.send('ROY Club API for Google Spreadsheets')
})

let PORT = process.env.PORT || 8082
const server = app.listen( PORT, () => console.log(`Server running on port ${PORT}...`) )