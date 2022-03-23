import React from 'react'

export const FeedContext = React.createContext({})

export function useFeedContext() {
	return React.useContext(FeedContext)
}
