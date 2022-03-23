require('dotenv').config()

const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const {Server} = require('socket.io')
const bodyParser = require('body-parser')
var cors = require('cors')

const {Client} = require('@elastic/elasticsearch')
const client = new Client({node: 'http://localhost:9200'})

const io = new Server(server, {
	cors: {
		origin: '*',
	},
})

const contentService = require('./src/services/content')
const feedService = require('./src/services/feed')

app.use(bodyParser.json())
app.use(cors())
app.set('socketio', io)
app.set('esClient', client)
app.set('feedService', feedService(app))

app.use('/api/content', contentService)

server.listen(8081, () => {
	console.log('listening on *:8080')
})
