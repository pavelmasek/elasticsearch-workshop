import React from 'react'
import socket from '../services/socket'

export default function useSocket() {
	React.useEffect(() => {
		socket()
		return () => {
			socket().close()
		}
	}, [])
}
