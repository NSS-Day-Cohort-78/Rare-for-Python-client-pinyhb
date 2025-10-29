import React, { useContext, useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { TagsContext } from "./TagsProvider"
import { TagsCheckbox } from "./TagsCheckbox"

export const PostTags = () => {
	const { id } = useParams()
	const { getAllTags, tags, postTags, getPostTags, deletePostTags } = useContext(TagsContext)
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

	const handleSave =  async (e)  => {
		e.preventDefault()

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
								checked={checked}
								setChecked={setChecked}
							/>
						)
					})}
				</fieldset>
				<button className="button" onClick={handleSave}>Save</button>
			</form>
		</div>
	)
}
