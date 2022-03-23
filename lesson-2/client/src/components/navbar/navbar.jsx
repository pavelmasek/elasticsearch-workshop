import {useNavigate} from 'react-router-dom'
import Navbar from 'rsuite/Navbar'
import Nav from 'rsuite/Nav'

export default function Navigation() {
	const navigate = useNavigate()
	return (
		<Navbar>
			<Navbar.Brand>ES percolator workshop</Navbar.Brand>
			<Nav
				onSelect={key => {
					navigate(key)
				}}>
				<Nav.Item eventKey="/feed">Feed</Nav.Item>
				<Nav.Item eventKey="/content-create">Content Create</Nav.Item>
			</Nav>
		</Navbar>
	)
}
