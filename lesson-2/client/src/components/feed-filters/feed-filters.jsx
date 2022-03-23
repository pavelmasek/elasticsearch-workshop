import React, {useState} from 'react'

import Form from 'rsuite/Form'

import Button from 'rsuite/Button'
import Checkbox from 'rsuite/Checkbox'
import CheckboxGroup from 'rsuite/CheckboxGroup'
import DateRangePicker from 'rsuite/DateRangePicker'
import TagPicker from 'rsuite/TagPicker'

import {useFeedContext} from '../../contexts/feed-context'

import profiles from '../../consts/profiles'
import labels from '../../consts/labels'
import LOCAL_STORAGE_KEYS from '../../consts/local-storage-keys'

const DEFAULT_STATE = {
	publish_time: [],
	labels: [],
	profiles: [],
	message: '',
	networks: [],
}

export default function FeedFilters() {
	const feedContext = useFeedContext()
	const [formState, setFormState] = useState(() => {
		const feedFilters = localStorage.getItem(
			LOCAL_STORAGE_KEYS.FEED_FILTERS_LOCAL_STORAGE_KEY,
		)
		if (!feedFilters) return DEFAULT_STATE
		const parsedFilters = JSON.parse(feedFilters)
		if (parsedFilters.publish_time) {
			parsedFilters.publish_time = [
				new Date(parsedFilters.publish_time[0]),
				new Date(parsedFilters.publish_time[1]),
			]
		}
		return {...DEFAULT_STATE, ...parsedFilters}
	})
	return (
		<div className="feedFilter">
			<Form
				formValue={formState}
				onChange={formValue => {
					setFormState(formValue)
				}}>
				<Form.Group controlId="publishingTime">
					<Form.ControlLabel>Publish time:</Form.ControlLabel>
					<Form.Control name="publish_time" accepter={DateRangePicker} />
				</Form.Group>
				<Form.Group controlId="profile">
					<Form.ControlLabel>Profiles:</Form.ControlLabel>
					<Form.Control
						name="profiles"
						accepter={TagPicker}
						size="lg"
						data={profiles}
						style={{width: 300, display: 'block', marginBottom: 10}}
					/>
				</Form.Group>
				<Form.Group controlId="networks">
					<Form.ControlLabel>Networks:</Form.ControlLabel>
					<Form.Control name="networks" accepter={CheckboxGroup} inline>
						<Checkbox value="facebook">Facebook</Checkbox>
						<Checkbox value="instagram">Instagram</Checkbox>
						<Checkbox value="twitter">Twitter</Checkbox>
						<Checkbox value="youtube">Youtube</Checkbox>
					</Form.Control>
				</Form.Group>
				<Form.Group controlId="content">
					<Form.ControlLabel>Post content:</Form.ControlLabel>
					<Form.Control name="message" />
				</Form.Group>
				<Form.Group controlId="labels">
					<Form.ControlLabel>Labels:</Form.ControlLabel>
					<Form.Control
						name="labels"
						accepter={TagPicker}
						size="lg"
						data={labels}
						style={{width: 300, display: 'block', marginBottom: 10}}
					/>
				</Form.Group>
			</Form>
			<Button
				appearance="ghost"
				onClick={ev => {
					localStorage.setItem(
						LOCAL_STORAGE_KEYS.FEED_FILTERS_LOCAL_STORAGE_KEY,
						JSON.stringify(formState),
					)
					feedContext.setFeedFilters(formState)
				}}>
				Filter
			</Button>
		</div>
	)
}
