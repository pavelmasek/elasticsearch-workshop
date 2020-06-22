const { Client } = require('elasticsearch')
const dataset = require('./elasticsearch-workshop-lesson-0.json')

const client = new Client({
  node: 'http://localhost:9200'
})

const indexName = 'posts-lesson-0'

async function run () {
    const indexCreatinResponse = await client.indices.create({
      index: indexName,
    }, { ignore: [400] })

    const body = dataset.flatMap(doc => [{ index: { _index: indexName } }, doc])

    const bulkResponse = await client.bulk({ refresh: true, body })

    if (bulkResponse.errors) {
      console.log('Errors', bulkResponse.errors)
    }
    
    const countResponse = await client.count({ index: indexName })
    console.log(countResponse.count)
}

run().catch(console.log)