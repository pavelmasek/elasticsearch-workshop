require('dotenv').config()

const {Client} = require('@elastic/elasticsearch')

const client = new Client({
	node: process.env.ES_SERVER,
})

const data = require('./lesson-2-data.json')
const mapping = require('./lesson-2-mapping.json')

async function run() {
	const indexCreationResponse = await client.indices.create(
		{
			index: process.env.POSTS_INDEX,
			body: mapping,
		},
		{ignore: [400]},
	)

	const bulkCreationResponse = await client.bulk({
		body: data.flatMap(doc => [
			{index: {_index: process.env.POSTS_INDEX}},
			doc,
		]),
	})

	console.log(bulkCreationResponse)
}

run().catch(console.error)
