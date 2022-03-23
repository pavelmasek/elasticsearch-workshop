require('dotenv').config()
const fs = require('fs')
const {Client} = require('@elastic/elasticsearch')

const client = new Client({
	node: process.env.ES_SERVER,
})

const fixNetwork = profile => {
	if (profile.startsWith('fb')) return 'facebook'
	if (profile.startsWith('tw')) return 'twitter'
	if (profile.startsWith('ig')) return 'instagram'
	if (profile.startsWith('yt')) return 'youtube'
}

async function run() {
	const response = await client.search({
		index: process.env.POSTS_INDEX,
		size: 1000,
	})

	const data = response.body.hits.hits.map(({_source}) => ({
		..._source,
		network: _source.network || fixNetwork(_source.profile),
	}))

	fs.writeFileSync(
		'./scripts/lesson-2-data.json',
		JSON.stringify(data, null, 2),
		err => {
			console.log(err)
			console.log('Done ')
		},
	)
}

run().catch(console.error)
