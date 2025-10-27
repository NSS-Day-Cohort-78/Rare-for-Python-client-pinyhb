import React, { useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { TagsContext } from "./TagsProvider"

export const EditTagForm = () => {
	const { id } = useParams()
	const { tag, setTag, getTagById, updateTag } = useContext(TagsContext)

	useEffect(() => {
		getTagById(id)
	}, [])

	const navigate = useNavigate()

	const handleChange = e => {
		const copyTag = { ...tag }
		copyTag.label = e.target.value
		setTag(copyTag)
	}
	const handleSave = e => {
		e.preventDefault()
		updateTag(id, tag).then(() => navigate("/tags-manager"))
	}
	return (
		<div className="container">
			<h1 className="title">Edit Tag</h1>
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
