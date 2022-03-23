import React, {useState} from 'react'

import Navbar from '../../components/navbar/navbar'
import Wallitem from '../../components/wallitem/wallitem'
import FeedFilters from '../../components/feed-filters/feed-filters'
import Loader from 'rsuite/Loader'
import IconButton from 'rsuite/IconButton'
import SearchIcon from '@rsuite/icons/Search'
import Button from 'rsuite/Button'

import {FeedContext} from '../../contexts/feed-context'
import useFeed from '../../hooks/use-feed'
import LOCAL_STORAGE_KEYS from '../../consts/local-storage-keys'

import './feed.css'

export default function FeedWithContext() {
	const [feedFilters, setFeedFilters] = useState(() => {
		const storageKeyValue = localStorage.getItem(
			LOCAL_STORAGE_KEYS.FEED_FILTERS_LOCAL_STORAGE_KEY,
		)
		return storageKeyValue ? JSON.parse(storageKeyValue) : {}
	})

	return (
		<FeedContext.Provider value={{feedFilters, setFeedFilters}}>
			<Feed />
		</FeedContext.Provider>
	)
}

function Feed() {
	const {data, isLoading, loadMorePosts, feedIdRef} = useFeed()
	return (
		<div>
			<Navbar />
			{feedIdRef.current && (
				<IconButton
					appearance="primary"
					icon={<SearchIcon />}
					style={{marginLeft: 'auto', marginRight: 'auto'}}
					onClick={() =>
						window.open(
							'http://localhost:9200/posts-percolations-v4/_doc/' +
								feedIdRef.current,
						)
					}>
					Check feed percolator
				</IconButton>
			)}
			<div className="feed">
				<div className="feedContent">
					{isLoading ? (
						<Loader size="lg" />
					) : (
						data?.posts.map(post => <Wallitem post={post} key={post._id} />)
					)}
					{!isLoading && data?.posts.length === 0 && <div>No posts</div>}
					{data?.total > data?.posts.length && (
						<Button onClick={() => loadMorePosts()}>Load more</Button>
					)}
				</div>
				<FeedFilters />
			</div>
		</div>
	)
}
