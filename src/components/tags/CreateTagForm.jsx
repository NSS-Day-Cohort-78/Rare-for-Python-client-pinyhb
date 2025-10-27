import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { TagsContext } from "./TagsProvider"

export const CreateTagForm = () => {
	const [tag, setTag] = useState({
		label: ""
	})

	const { createTag } = useContext(TagsContext)

	const navigate = useNavigate()
	const handleChange = e => {
		const copyTag = { ...tag }
		copyTag.label = e.target.value
		setTag(copyTag)
	}

	const handleSave = e => {
		e.preventDefault()

		if (tag.label !== "") {
			createTag(tag).then(() => navigate("/tags-manager"))
		}
	}
	return (
		<div className="container">
			<h1 className="title">Create Tag</h1>
			<form className="container">
				<fieldset>
					<input
						onChange={handleChange}
						type="text"
						value={tag.label}
					/>
				</fieldset>
				<div className="">
					<button className="button" onClick={handleSave}>
						Save
					</button>
					<button
						className="button ml-5"
						onClick={e => {
							e.preventDefault()
							navigate(`/tags-manager`)
						}}>
						Cancel
					</button>
				</div>
			</form>
		</div>
	)
}
