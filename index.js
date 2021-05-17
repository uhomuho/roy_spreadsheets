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

const { GoogleSpreadsheet } = require('google-spreadsheet')
app.post('/add', async (req, res) => {
	try {
		let { id, data, sheetId } = req.body,
				doc = new GoogleSpreadsheet(id)

		await doc.useServiceAccountAuth({
			client_email: process.env.EMAIL,
			private_key: process.env.PRIVATE_KEY.replace(/\\n/gm, '\n'),
		})
		await doc.loadInfo()
	
		const sheet = sheetId ? doc.sheetsById[sheetId] : doc.sheetsByIndex[0]

		data["Дата"] = `${new Date()}`

		await sheet.addRow(data)

		res.send(`Data successfully added to '${doc.title}' spreadsheet`)
	} catch (err) {
		console.error(err)
		res.sendStatus(500)
	}
})

let PORT = process.env.PORT || 8082
const server = app.listen( PORT, () => console.log(`Server running on port ${PORT}...`) )