import React from 'react'
import {useMutation} from 'react-query'
import {useLocation} from 'react-router-dom'

import Form from 'rsuite/Form'
import Input from 'rsuite/Input'
import DatePicker from 'rsuite/DatePicker'
import Button from 'rsuite/Button'
import SelectPicker from 'rsuite/SelectPicker'
import TagPicker from 'rsuite/TagPicker'
import Navbar from '../../components/navbar/navbar'

import profiles from '../../consts/profiles'
import labels from '../../consts/labels'

import './content-create.css'

const Textarea = React.forwardRef((props, ref) => (
	<Input {...props} as="textarea" ref={ref} />
))

const PublishTimePicker = React.forwardRef((props, ref) => (
	<DatePicker
		{...props}
		format="yyyy-MM-dd HH:mm:ss"
		ranges={[
			{
				label: 'Now',
				value: new Date(),
			},
		]}
		style={{width: 260}}
		ref={ref}
	/>
))

const ProfilePicker = React.forwardRef((props, ref) => (
	<SelectPicker
		{...props}
		data={profiles}
		groupBy="network"
		ref={ref}
		style={{width: 224}}
	/>
))

const FIELDS = ['profile', 'message', 'publish_time']

const INITIAL_EDITOR_STATE = {
	profile: null,
	message: '',
	publish_time: null,
	labels: [],
}

export default function ContentCreate() {
	const {state} = useLocation()
	const [editorState, setEditorState] = React.useState(() => {
		if (state)
			return {
				id: state._id,
				...state._source,
				publish_time: new Date(state._source.publish_time),
			}
		return {...INITIAL_EDITOR_STATE}
	})
	const [editorValidation, setEditorValidation] = React.useState([...FIELDS])
	const [showValidations, setShowValidations] = React.useState(false)

	const {mutateAsync: createPost} = useMutation(async () => {
		return fetch('http://localhost:8081/api/content/create', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				...editorState,
				network: profiles.find(p => p.value === editorState.profile).network,
			}),
		})
	})
	const {mutateAsync: updatePost} = useMutation(async () => {
		return fetch('http://localhost:8081/api/content/update', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				...editorState,
				network: profiles.find(p => p.value === editorState.profile).network,
			}),
		})
	})

	const handleSubmit = async () => {
		if (Object.keys(editorValidation).length > 0) {
			setShowValidations(true)
			return
		}
		let response
		if (editorState.id) {
			response = await updatePost()
		} else {
			response = await createPost()
		}
		if (!response.ok) return
		setShowValidations(false)
		setEditorState({...INITIAL_EDITOR_STATE})
	}

	return (
		<div>
			<Navbar />
			<div className="container">
				<Form
					formValue={editorState}
					checkTrigger="blur"
					onChange={formValue => {
						setEditorState(formValue)
						const errors = FIELDS.filter(field => !formValue[field])
						setEditorValidation(errors)
					}}>
					<Form.Group controlId="profile">
						<Form.ControlLabel>Profiles:</Form.ControlLabel>
						<Form.Control
							name="profile"
							accepter={ProfilePicker}
							value={editorState.profile}
						/>
						<Form.ErrorMessage
							show={showValidations && editorValidation.includes('profile')}>
							Required field
						</Form.ErrorMessage>
					</Form.Group>
					<Form.Group controlId="content">
						<Form.ControlLabel>Post content:</Form.ControlLabel>
						<Form.Control
							checkTrigger="blur"
							rows={10}
							name="message"
							accepter={Textarea}
							value={editorState.message}
						/>
						<Form.ErrorMessage
							show={showValidations && editorValidation.includes('message')}>
							Required field
						</Form.ErrorMessage>
					</Form.Group>
					<Form.Group controlId="publishingTime">
						<Form.ControlLabel>Publish time:</Form.ControlLabel>
						<Form.Control
							name="publish_time"
							accepter={PublishTimePicker}
							value={editorState.publish_time && editorState.publish_time}
						/>
						<Form.ErrorMessage
							show={
								showValidations && editorValidation.includes('publish_time')
							}>
							Required field
						</Form.ErrorMessage>
					</Form.Group>
					<Form.Group controlId="labels">
						<Form.ControlLabel>Labels:</Form.ControlLabel>
						<Form.Control
							name="labels"
							accepter={TagPicker}
							size="lg"
							data={labels}
							style={{width: 300, display: 'block', marginBottom: 10}}
							value={editorState.labels}
						/>
					</Form.Group>
				</Form>
				<div className="buttonToolbar">
					<Button
						onClick={handleSubmit}
						appearance="primary"
						disabled={
							showValidations && Object.keys(editorValidation).length > 0
						}>
						{state ? 'Update' : 'Create'}
					</Button>
				</div>
			</div>
		</div>
	)
}
