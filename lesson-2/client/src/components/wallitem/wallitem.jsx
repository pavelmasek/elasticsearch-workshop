import {useNavigate} from 'react-router-dom'
import {useMutation} from 'react-query'

import {Panel} from 'rsuite'
import Tag from 'rsuite/Tag'
import TagGroup from 'rsuite/TagGroup'
import Profile from '../../components/profile/profile'
import Button from 'rsuite/Button'

import profiles from '../../consts/profiles'

const profilesCollection = profiles.reduce((acc, profile) => {
	acc[profile.id] = profile
	return acc
}, {})

export default function Wallitem({post}) {
	const navigate = useNavigate()
	const {mutate: deletePost} = useMutation(postId => {
		return fetch(`http://localhost:8081/api/content/delete/${postId}`, {
			method: 'DELETE',
		})
	})
	return (
		<div key={post._id}>
			<Panel
				shaded
				bordered
				bodyFill
				style={{display: 'inline-block', width: 500}}>
				<Panel
					header={
						<div className="header">
							<Profile
								name={profilesCollection[post._source.profile]?.label}
								network={profilesCollection[post._source.profile]?.network}
								image={profilesCollection[post._source.profile]?.image}
								postId={post._id}
							/>
							<div className="publishTime">
								{new Date(post._source.publish_time).toLocaleString()}
							</div>
						</div>
					}>
					<p>{post._source.message}</p>
					<p></p>
					<TagGroup>
						{post._source.labels?.map(label => (
							<Tag key={label} size="md">
								{label}
							</Tag>
						))}
					</TagGroup>
					<div className="actionButtons">
						<Button
							onClick={() => navigate('/content-create', {state: post})}
							appearance="link">
							Edit
						</Button>
						<Button onClick={() => deletePost(post._id)} appearance="ghost">
							Delete
						</Button>
					</div>
				</Panel>
			</Panel>
		</div>
	)
}
