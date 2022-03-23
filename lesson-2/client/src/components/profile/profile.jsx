import classnames from 'classnames'

import './profile.css'

export default function Profile({image, name, network, postId}) {
	return (
		<div className="profileInfo">
			<img
				src={image}
				className="profileImage"
				alt={name}
				onClick={ev => {
					if (ev.metaKey)
						window.open(`http://localhost:9200/posts-v1/_doc/${postId}`)
				}}
			/>
			<div className="profileNameUrl">
				<div className="profileInfoName">{name}</div>
				<div className="networkUrl">
					<div className={classnames(network, 'networkTag')}></div>
					<div className="profileUrl">
						/{name?.toLowerCase() || 'unset profile'}
					</div>
				</div>
			</div>
		</div>
	)
}
