import React, { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { TagsContext } from "./TagsProvider"
import { TagsCheckbox } from "./TagsCheckbox"

export const PostTags = () => {
	const { id } = useParams()
	const { getAllTags, tags, postTags, getPostTags, addPostTag, deletePostTags } =
		useContext(TagsContext)
	const [isChecked, setIsChecked] = useState([])
	const [checked, setChecked] = useState(false)
	const navigate = useNavigate()


	useEffect(() => {
		getAllTags()
		getPostTags(id)
	}, [])

	useEffect(() => {
		setIsChecked([...postTags])
	}, [postTags])

	const handleAddPostTag = async () => {
		// tags to add filters to get tags not already in DB
		const tagsToAdd = []
		for (const tag of isChecked) {
			const found = postTags.find(p => p.tag_id === tag.tag_id)

			if (!found) {
				tagsToAdd.push(tag)
			}
		}
		if (tagsToAdd.length > 0) {
			for (const tag of tagsToAdd) {
				await addPostTag(tag)
			}
		}
	}

	const handleSave = async e => {
		e.preventDefault()
		await handleAddPostTag()
		navigate(`/posts/${id}`)

		try {			
			const checkedTagIds = isChecked.map(tag => tag.id)
			const tagsToDelete = postTags.filter(tag => !checkedTagIds.includes(tag.id))

			for (const tag of tagsToDelete) {
				await deletePostTags(tag.id)
			}
			await getPostTags(id)

			navigate(`/posts/${id}`)

		} catch (error) {
			console.error("Error deleting tags:", error)
		}
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
							/>
						)
					})}
				</fieldset>
				<button className="button" onClick={handleSave}>
					Save
				</button>
			</form>
		</div>
	)
}
