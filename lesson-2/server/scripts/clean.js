require('dotenv').config()

const {Client} = require('@elastic/elasticsearch')

const client = new Client({
	node: process.env.ES_SERVER,
})

async function run() {
	const deleteResponse = await client.deleteByQuery({
		index: process.env.POSTS_INDEX,
		body: {
			query: {
				match_all: {},
			},
		},
	})
	console.log(deleteResponse)
}

run().catch(console.error)
