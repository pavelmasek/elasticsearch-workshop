export function getMustFeedFilters(filters) {
	const must = []

	if (filters.publish_time) {
		must.push({
			range: {
				publish_time: {
					gte: filters.publish_time[0],
					lte: filters.publish_time[1],
				},
			},
		})
	}

	if (filters.profiles?.length) {
		must.push({
			terms: {
				profile: filters.profiles,
			},
		})
	}

	if (filters.networks?.length) {
		must.push({
			terms: {
				network: filters.networks,
			},
		})
	}

	if (filters.labels?.length) {
		must.push({
			terms: {
				labels: filters.labels,
			},
		})
	}

	if (filters.message) {
		must.push({
			match: {
				message: {
					query: filters.message,
				},
			},
		})
	}
	return must
}
