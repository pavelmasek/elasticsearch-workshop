import {io} from 'socket.io-client'

let socket = null

export default function getSocket() {
	if (socket) return socket
	socket = io('ws://localhost:8081')
	return socket
}
