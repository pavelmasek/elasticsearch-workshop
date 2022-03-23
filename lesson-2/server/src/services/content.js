const express = require('express')
const router = express.Router()

router.post('/create', async (req, res) => {
	const client = req.app.get('esClient')
	const {feedUpdate} = req.app.get('feedService')
	// <Task1: Create a new document in the content index>
	const newPost = await client.index({
		index: process.env.POSTS_INDEX,
		body: {
			...req.body,
		},
	})
	// </Task1>

	// <Task4: Update the feed on new content creation>
	await feedUpdate('add', {id: newPost.body._id})
	// </Task4>
router.put('/update', async (req, res) => {
	const client = req.app.get('esClient')
	const {feedUpdate} = req.app.get('feedService')

	const {id, ...rest} = req.body
	// <Task2: Create a new document in the content index>
	await client.index({
		index: process.env.POSTS_INDEX,
		id: id,
		body: {
			...rest,
		},
	})
	// </Task2>
	// <Task4: Update the feed on altering content>
	await feedUpdate('update', {id})
	// </Task4>
	res.send({status: 'cajk'})
})

router.delete('/delete/:id', async (req, res) => {
	const client = req.app.get('esClient')
	const {feedUpdate} = req.app.get('feedService')
	// <Task4: Update the feed on content delete>
	await feedUpdate('remove', {id: req.params.id})
	// </Task4>
	// <Task3: Create a new document in the content index>
	await client.delete({
		index: process.env.POSTS_INDEX,
		id: req.params.id,
	})
	// </Task3>
	res.send({status: 'cajk'})
})

module.exports = router
