import React, { useEffect, useState } from "react"
import { DeleteCommentButton } from "./DeleteCommentButton"

export const CommentsList = ({ comment, token }) => {
	const currentUser = parseInt(token)
	const [commentObj, setCommentObj] = useState({})
	const [modal, setModal] = useState(false)

	useEffect(() => {
		setCommentObj(comment)
	}, [])

	return (
		<div className=" p-5 comment container is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
			<h2>{comment.category.label}</h2>
			<p>{comment.content}</p>
			<div className="is-flex is-grouped is-flex-direction-row is-align-items-center">
				<p>{comment.author.username}</p>
				{/* <div className="is-justify-content-right">{currentUser === commentObj.author?.author_id ? <DeleteCommentButton id={comment.id}/> : ""}
				</div> */}
				{parseInt(token) === comment.author?.author_id ? (
				<div className="is-flex is-align-items-center is-justify-content-center">
					<i
						onClick={() => setModal(true)}
						className="fa-solid fa-trash is-clickable"></i>
				</div>
			) : (
				""
			)}


			{modal ? <DeleteCommentButton setModal={setModal} comment={commentObj} /> : ""}
			</div>
		</div>
	)
}
