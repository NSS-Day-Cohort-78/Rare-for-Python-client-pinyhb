import React, { useContext } from "react"
import { UserContext } from "../auth/UserProvider"
import { useNavigate, useParams } from "react-router-dom"

export const CommentsList = ({ comment }) => {
	const navigate = useNavigate()
	const { token } = useContext(UserContext)
	const { id } = useParams()
	return (
		<div className=" p-5 comment container is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
			<h2>{comment.category.label}</h2>
			<p>{comment.content}</p>
			<p>{comment.author.username}</p>
			{parseInt(token) === comment.author.id ? (
				<button
					onClick={() =>
						navigate(`/posts/${id}/comment/${comment.id}/edit`)
					}
					className="button">
					edit
				</button>
			) : (
				""
			)}
		</div>
	)
}
