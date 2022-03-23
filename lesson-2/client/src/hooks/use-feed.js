import {useEffect, useRef} from 'react'
import {useQuery, useMutation, useQueryClient} from 'react-query'
import {useFeedContext} from '../contexts/feed-context'
import {getMustFeedFilters} from '../utils/feed'

import socket from '../services/socket'

export default function useFeed() {
	const feedIdRef = useRef()
	const {data, isLoading} = useFeedData(feedIdRef)
	useFeedUpdate(feedIdRef)
	const {mutate: loadMorePosts} = useFeedLoadMore({feedIdRef, data})
	return {data, isLoading, loadMorePosts, feedIdRef}
}

export function useFeedData(feedIdRef) {
	const filters = useFeedContext().feedFilters
	return useQuery(
		['feed-create', filters],
		() => {
			const query = {
				bool: {
					must: getMustFeedFilters(filters),
				},
			}
			if (feedIdRef.current) {
				socket().emit('feed-remove', {feedId: feedIdRef.current})
			}
			feedIdRef.current = Math.random().toString(36).substring(2)
			return new Promise(resolve => {
				socket().emit('feed', {query, feedId: feedIdRef.current}, resolve)
			})
		},
		{refetchOnWindowFocus: false},
	)
}

export function useFeedUpdate(feedIdRef) {
	const filters = useFeedContext().feedFilters
	const queryClient = useQueryClient()
	useEffect(() => {
		socket().on('feed-update', async data => {
			queryClient.setQueryData(['feed-create', filters], oldData => {
				if (data.feedId !== feedIdRef.current) return oldData
				if (data.add) {
					return {
						posts: [...oldData.posts, data.add],
						total: oldData.total + 1,
					}
				}
				if (data.remove) {
					return {
						posts: oldData.posts.filter(post => post._id !== data.remove),
						total: oldData.total - 1,
					}
				}
				if (data.update) {
					return {
						posts: oldData.posts.map(post => {
							if (post._id === data.update.id) {
								return data.update
							}
							return post
						}),
						total: oldData.total,
					}
				}
			})
		})
	}, [filters, queryClient, feedIdRef.current])
}

export function useFeedLoadMore({feedIdRef, data}) {
	const queryClient = useQueryClient()
	const filters = useFeedContext().feedFilters
	return useMutation(
		() => {
			const query = {
				bool: {
					must: getMustFeedFilters(filters),
					must_not: [
						{
							ids: {values: data.posts.map(post => post._id)},
						},
					],
				},
			}
			return new Promise(resolve => {
				socket().emit(
					'feed',
					{query, feedId: feedIdRef.current, action: 'load-more'},
					resolve,
				)
			})
		},
		{
			onSuccess: newData => {
				queryClient.setQueryData(['feed-create', filters], oldData => {
					return {
						posts: [...oldData.posts, ...newData.posts],
						total: newData.total + oldData.posts.length,
					}
				})
			},
		},
	)
}
