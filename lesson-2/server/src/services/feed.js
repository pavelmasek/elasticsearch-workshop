module.exports = function (app) {
	const io = app.get('socketio')
	const esClient = app.get('esClient')

	io.on('connection', socket => {
		socket.on('feed', async (data, callback) => {
			const {query} = data
			const result = await esClient.search({
				index: process.env.POSTS_INDEX,
				size: 10,
				sort: ['publish_time:asc'],
				body: {query},
			})

			if (data.action !== 'load-more') {
				// <Task4: Register percolator and send update>
				//<Task5: Receive updates only for visible content>
				await esClient.index({
					index: process.env.PERCOLATE_INDEX,
					id: data.feedId,
					body: {
						feed_id: data.feedId,
						query,
					},
				})
				//</Task5>
				// </Task4>
				socket.join(data.feedId)
			} else {
				//<Task6: Receive updates for visible content after load more>
				//</Task6>
			}

			callback({
				posts: result.body.hits.hits,
				total: result.body.hits.total.value,
			})
		})
		socket.on('feed-remove', async data => {
			socket.leave(data.feedId)
			// <Task7: Create percolation cleaner logic>
			// but do it better :troll_face:
			await esClient.delete({
				index: 'posts-percolations-v4',
				id: data.feedId,
			})
			// </Task7>
		})
	})

	async function feedUpdate(action, {id}) {
		// <Task4: Register percolator and send update>
		const percolationResults = await esClient.search({
			index: process.env.PERCOLATE_INDEX,
			size: 1000,
			body: {
				query: {
					percolate: {
						field: 'query',
						index: process.env.POSTS_INDEX,
						id,
					},
				},
			},
		})
		// </Task4>
		const hits = percolationResults.body.hits.hits
		let update
		if (['add', 'update'].includes(action) && hits.length > 0) {
			const post = await esClient.get({index: 'posts-v1', id})
			update = post.body
		}
		if (action === 'remove') {
			update = id
		}
		hits.forEach(({_id, _source}) => {
			io.to(_id).emit('feed-update', {
				[action]: update,
				feedId: _source.feed_id,
			})
		})
	}

	return {
		feedUpdate,
	}
}
