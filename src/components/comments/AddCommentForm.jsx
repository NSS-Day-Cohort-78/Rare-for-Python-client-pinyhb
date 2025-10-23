import React, { useContext, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../auth/UserProvider"
import { CommentsContext } from "./CommentsProvider"

export const AddCommentForm = () => {
	const { id } = useParams()
	const { token } = useContext(UserContext)
	const { createComment } = useContext(CommentsContext)
	const navigate = useNavigate()

	const [comment, setComment] = useState({
		post_id: parseInt(id),
		author_id: parseInt(token),
		content: ""
	})

	const handleChange = e => {
		const copyComment = { ...comment }
		copyComment.content = e.target.value
		setComment(copyComment)
	}

	const handleSubmit = e => {
		e.preventDefault()

		if (comment.content !== "") {
			createComment(comment).then(() => navigate(`/posts/${id}/comments`))
		}
	}
	return (
		<div className="container">
			<h1 className="title">Add Comment</h1>

			<form className="container" onSubmit={handleSubmit}>
				<fieldset>
					<textarea
						onChange={handleChange}
						id="content"
						cols={100}
						rows={20}
						value={comment.content}
						placeholder="Write comments ..."></textarea>
				</fieldset>
				<button className="button">Save</button>
			</form>
		</div>
	)
}
