import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import useSocket from './hooks/use-socket'

import Feed from './view/feed/feed'
import ContentCreate from './view/content-create/content-create'

import 'rsuite/dist/rsuite.min.css'

function App() {
	useSocket()
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Feed />} />
				<Route path="/feed" element={<Feed />} />
				<Route path="/content-create" element={<ContentCreate />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
