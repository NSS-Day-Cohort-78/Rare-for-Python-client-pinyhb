import React, { useState } from "react"

export const CreateReactionsForm = ({ getReactions, createReaction }) => {
	const [reaction, setReaction] = useState({
		label: "",
		image_url: ""
	})

	const handleChange = e => {
		const copyReaction = { ...reaction }
		copyReaction[e.target.name] = e.target.value
		setReaction(copyReaction)
	}

	const handleSubmit = e => {
		e.preventDefault()

		if (reaction.label !== "" && reaction.image_url !== "") {
			createReaction(reaction).then(() => getReactions())
		}
	}
	return (
		<div className="form container form-container">
			<h1>Create a new reaction</h1>
			<form className="container" onSubmit={handleSubmit}>
				<fieldset className="container">
					<label className="" htmlFor="reaction-label">
						Label
					</label>
					<input
						onChange={handleChange}
						name="label"
						type="text"
						id="reaction-label"
						placeholder="label"
						value={reaction.label}
					/>
				</fieldset>
				<fieldset className="container">
					<label className="" htmlFor="reaction-url">
						Url
					</label>
					<input
						onChange={handleChange}
						name="image_url"
						type="text"
						id="reaction-url"
						placeholder="url"
						value={reaction.image_url}
					/>
				</fieldset>
				<button className="button">Save</button>
			</form>
		</div>
	)
}
