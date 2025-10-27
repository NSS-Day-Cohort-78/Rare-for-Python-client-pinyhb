import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { TagsContext } from "./TagsProvider"
import { TagsCheckbox } from "./TagsCheckbox"

export const PostTags = () => {
	const { id } = useParams()
	const { getAllTags, tags, postTags, getPostTags } = useContext(TagsContext)
	const [isChecked, setIsChecked] = useState([])
	const [checked, setChecked] = useState(false)

	useEffect(() => {
		getAllTags()
		getPostTags(id)
	}, [])

	useEffect(() => {
		setIsChecked([...postTags])
	}, [postTags])

	const handleSave = e => {
		e.preventDefault()
	}
	return (
		<div className="container">
			<h1 className="title">tags</h1>
			<form>
				<fieldset>
					{tags.map(t => {
						return (
							<TagsCheckbox
								key={t.id}
								t={t}
								isChecked={isChecked}
								setIsChecked={setIsChecked}
								postTags={postTags}
								postId={id}
								checked={checked}
								setChecked={setChecked}
							/>
						)
					})}
				</fieldset>
				<button className="button">Save</button>
			</form>
		</div>
	)
}
