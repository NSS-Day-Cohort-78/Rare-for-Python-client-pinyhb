import React, { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { CommentsContext } from "./CommentsProvider"

export const EditCommentForm = () => {
	const { id, commentId } = useParams()
	const [comment, setComment] = useState({})
	const navigate = useNavigate()

	const { getCommentById, editComment } = useContext(CommentsContext)

	useEffect(() => {
		getCommentById(commentId).then(setComment)
	}, [])

	const handleChange = e => {
		const copyComment = { ...comment }
		copyComment.content = e.target.value
		setComment(copyComment)
	}

	const handleSubmit = e => {
		e.preventDefault()

		editComment(comment, commentId).then(() =>
			navigate(`/posts/${id}/comments`)
		)
	}

	const handleCancel = e => {
		e.preventDefault()

		navigate(`/posts/${id}/comments`)
	}
	return (
		<div className="container">
			<h1 className="title">Edit Comment</h1>
			<form className="container">
				<fieldset>
					<textarea
						onChange={handleChange}
						cols={100}
						rows={20}
						id="content"
						value={comment.content}></textarea>
				</fieldset>
				<div>
					<button onClick={handleSubmit} className="button">
						Save
					</button>
					<button onClick={handleCancel} className="button">
						Cancel
					</button>
				</div>
			</form>
		</div>
	)
}
